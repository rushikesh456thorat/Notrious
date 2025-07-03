import fs from 'fs'

export const createShopifyProduct = async (storeUrl, accessToken, productData) => {
  const graphqlEndpoint = `https://${storeUrl}/admin/api/2023-10/graphql.json`;

  // Step 1: Create the product
  const createProductMutation = `
    mutation createProduct($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          descriptionHtml
          variants(first: 1) {
            edges {
              node {
                price
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const productInput = {
    title: productData.title,
    descriptionHtml: productData.description,
    variants: [{ price: productData.price }],
    options: ["Title"]
  };


  try {
    const createProductResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query: createProductMutation, variables: { input: productInput } })
    });

    const createProductResult = await createProductResponse.json();
    if (createProductResult.errors || createProductResult.data.productCreate.userErrors.length > 0) {
      return { status: 'failed', message: 'Something went wrong while creating the product.' };
    }
   
    const productId = createProductResult.data.productCreate.product.id;
    

    // Step 2: Add images to the product
    const addImagesMutation = `
      mutation addMedia($productId: ID!, $media: [CreateMediaInput!]!) {
        productCreateMedia(productId: $productId, media: $media) {
          media {
            id
            preview {
              image {
                url
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const mediaInputs = productData.images.map(image => ({
      mediaContentType: "IMAGE",
      originalSource: image
    }));

    const addImagesResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({
        query: addImagesMutation,
        variables: { productId, media: mediaInputs }
      })
    });

    const addImagesResult = await addImagesResponse.json();
    if (addImagesResult.errors || addImagesResult.data.productCreateMedia.userErrors.length > 0) {
      return { status: 'failed', message: 'Failed to add product images.' };
    }

    // Step 3: Add metafields
    const setMetafieldMutation = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            namespace
            key
            value
            type
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const metafields = [
      {
        namespace: "custom",
        key: "features_line",
        value: JSON.stringify(productData.featuresLine),
        type: "json"
      },
      {
        namespace: "custom",
        key: "paragraph",
        value: JSON.stringify(productData.paragraph),
        type: "json"
      },
      {
        namespace: "custom",
        key: "reviews",
        value: JSON.stringify(productData.reviews),
        type: "json"
      },
      {
        namespace: "custom",
        key: "paragraph_titles",
        value: JSON.stringify(productData.paragraphTitles),
        type: "json"
      },
      {
        namespace: "custom",
        key: "footer_title",
        value: productData.footerTitle,
        type: "string"
      },
      {
        namespace: "custom",
        key: "footer_desc",
        value: productData.footerDesc,
        type: "string"
      }
    ].map(m => ({ ...m, ownerId: productId }));

    const setMetafieldsResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query: setMetafieldMutation, variables: { metafields } })
    });

    const setMetafieldsResult = await setMetafieldsResponse.json();
    if (setMetafieldsResult.errors || setMetafieldsResult.data.metafieldsSet.userErrors.length > 0) {
      return { status: 'failed', message: 'Failed to set metafields.' };
    }

    // Step 4: Set the template
    const setTemplateMutation = `
      mutation setTemplate($input: ProductInput!) {
        productUpdate(input: $input) {
          product {
            id
            templateSuffix
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const templateInput = {
      id: productId,
      templateSuffix: "custom"
    };

    const setTemplateResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query: setTemplateMutation, variables: { input: templateInput } })
    });

    const setTemplateResult = await setTemplateResponse.json();
    if (setTemplateResult.errors || setTemplateResult.data.productUpdate.userErrors.length > 0) {
      return { status: 'failed', message: 'Failed to set template.' };
    }

    return {
      status: 'success',
      message: 'Product created and customized successfully!',
      data: { productId }
    };

  } catch (error) {
    console.error(error);
    return {
      status: 'failed',
      message: 'Something went wrong while creating the product.'
    };
  }
};

export const addProductToOnlineStore = async (storeUrl, accessToken, productId) => {
  if (!productId) {
    console.error('Error: productId is required');
    return {
      status: 'failed',
      message: 'Product ID is required'
    };
  }

  const graphqlEndpoint = `https://${storeUrl}/admin/api/2023-10/graphql.json`;

  try {
    // Step 1: Get publication ID
    const getPublicationsQuery = `
      query {
        publications(first: 10) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;

    const publicationResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({ query: getPublicationsQuery })
    });

    const publicationResult = await publicationResponse.json();

    if (publicationResult.errors) {
      console.error('Error fetching publications:', publicationResult.errors);
      return {
        status: 'failed',
        message: 'Failed to fetch publications',
        errors: publicationResult.errors
      };
    }

    const publications = publicationResult.data?.publications?.edges || [];
    const onlineStorePublication = publications.find(
      (pub) => pub.node.name === 'Online Store'
    );

    if (!onlineStorePublication) {
      return {
        status: 'failed',
        message: 'Online Store publication not found.'
      };
    }

    const publicationId = onlineStorePublication.node.id;

    // Step 2: Publish product
    const publishProductMutation = `
      mutation PublishProduct($id: ID!, $publicationId: ID!) {
        publishablePublish(
          id: $id,
          input: { publicationId: $publicationId }
        ) {
          userErrors {
            field
            message
          }
        }
      }
    `;

    const publishResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: JSON.stringify({
        query: publishProductMutation,
        variables: {
          id: `${productId}`,
          publicationId: publicationId
        }
      })
    });

    const publishResult = await publishResponse.json();
    

    if (publishResult.errors) {
      console.error('Publish error:', publishResult.errors);
      return {
        status: 'failed',
        message: 'Failed to publish product',
        errors: publishResult.errors
      };
    }

    const userErrors = publishResult.data?.publishablePublish?.userErrors || [];
    if (userErrors.length > 0) {
      console.error('Publish user errors:', userErrors);
      return {
        status: 'failed',
        message: userErrors[0].message || 'Failed to publish product',
        errors: userErrors
      };
    }
    const productUrl = await getProductUrl(storeUrl, productId, accessToken)
    if(!productUrl){
      throw Error('Server Broke! id:addTemplateToShopify')
    }

    return {
      status: 'success',
      message: 'Product added to Online Store successfully!',
      data:{
        productUrl
      }
    };

  } catch (error) {
    console.error('Unexpected error:', error);
    return {
      status: 'failed',
      message: 'Something went wrong!',
      error: error.message
    };
  }
};





export const addTemplateToShopify = async (storeUrl, accessToken, nameOfTemplate) => {
  try {
    const templateData = fs.readFileSync(`./backend/src/utils/liquidPages/${nameOfTemplate}.liquid`, 'utf8');
    const themeId = await getActiveThemeId(storeUrl, accessToken);

    const mutation = `
        mutation themeFilesUpsert($files: [OnlineStoreThemeFilesUpsertFileInput!]!, $themeId: ID!) {
  themeFilesUpsert(files: $files, themeId: $themeId) {
    upsertedThemeFiles {
      filename
    }
    userErrors {
      field
      message
    }
  }
}

`;

    const variables = {
      "themeId": themeId,
      "files": [
        {
          "filename": "templates/product.custom.liquid",
          "body": {
            "type": "TEXT",
            "value": templateData
          }
        }
      ]
    }


    const response = await fetch(`https://${storeUrl}/admin/api/2024-10/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    
    return {
      status: 'success',
      message: 'Template added Successfully!',
      
    }
  } catch (error) {
    console.error('Error adding template:', error);
    return {
      status: 'failed',
      message: 'Something Went wrong! If you dev then check shopify services.'
    }
  }
};





export async function getActiveThemeId(storeUrl, accessToken) {
  const GET_ACTIVE_THEME_ID_QUERY = `
  {
    themes(first: 1) {
      edges {
        node {
          name
          id
          role
        }
      }
    }
  
  }
`;
  try {
    const response = await fetch(
      `https://${storeUrl}/admin/api/2024-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_ACTIVE_THEME_ID_QUERY }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();


    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return null;
    }

    const themes = data.data.themes.edges;

    if (themes.length > 0) {
      const activeThemeId = themes[0].node.id;

      return activeThemeId;
    } else {
      console.error('No active theme found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching active theme ID:', error.message);
    throw error;
  }
}

export async function checkTemplateExists(templateName, storeUrl, accessToken) {
  const GRAPHQL_URL = `https://${storeUrl}/admin/api/2024-10/graphql.json`;
  const themeId = await getActiveThemeId(storeUrl,accessToken);
  // Query to check if the template exists
  const query = `
    query {
      theme(id: "${themeId}") {
        id
        name
        role
        files(filenames: ["templates/product.${templateName}.liquid"], first: 1) {
          nodes {
            body {
              ... on OnlineStoreThemeFileBodyText {
                content
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Fetch the template
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    // Handle errors in the respons
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      return false;
    }

    // Check if the template exists
    const templateExists = data.data.theme.files.nodes.length > 0;

    return templateExists; // Return true if the template exists, otherwise false
  } catch (error) {
    console.error('Error checking template:', error);
    return false; // Return false in case of an error
  }
}


async function getProductUrl(storeUrl, productId, accessToken) {
  const GRAPHQL_URL = `https://${storeUrl}/admin/api/2024-10/graphql.json`;
  try {
    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          handle
        }
      }
    `;

    const variables = {
      id: `${productId}`
    };

    const response = await fetch(GRAPHQL_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
        },
        body: JSON.stringify({ query, variables })
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Shopify Storefront API Error:', errorData.extensions);
      throw new Error(`Storefront API request failed with status ${response.status}`);
    }

    const { data, errors } = await response.json();
    
    if (errors) {
      console.error('GraphQL Errors:', errors);
      return null;
    }

    if (!data?.product?.handle) {
      console.error('Product handle not found');
      return null;
    }

    return `https://${storeUrl}/products/${data.product.handle}`;
    
  } catch (error) {
    console.error('Error fetching product URL:', error);
    return null;
  }
}

