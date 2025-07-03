import PageCollection from '../../models/pagecollection.model.js';
import ProductPage from '../../models/productpage.model.js';
import User from '../../models/user.model.js';
import {
  checkTemplateExists,
  addTemplateToShopify,
  createShopifyProduct,
  addProductToOnlineStore
} from '../../services/shopifyServices.js';

const shopifyPage = async (req, res) => {
  const { id } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Unauthorized access.'
    });
  }

  if (!user.shopify.isConnected) {
    return res.status(400).json({
      status: 'fail',
      message: 'Connect your Shopify account first. Go to Account Section.'
    });
  }

  const { shopify } = await User.findById(user._id).select('shopify.accessToken');
  const accessToken = shopify.accessToken;
  const storeUrl = user.shopify.storeUrl;

  const productPage = await ProductPage.findOne({ publicId: id });

  if (!productPage) {
    return res.status(500).json({
      status: 'fail',
      message: "Product Page Not Found! Please try again. If the problem persists, contact us through the help section."
    });
  }

  const isTemplateExist = await checkTemplateExists("custom", storeUrl, accessToken);
  if (!isTemplateExist) {
    const addTemplate_res = await addTemplateToShopify('default', storeUrl, accessToken);

    if (addTemplate_res.status === "failed") {
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error. Please try again later. If the issue persists, contact us through the help section."
      });
    }
  }

  const createProduct_res = await createShopifyProduct(storeUrl, accessToken, productPage);


  if (createProduct_res.status === "failed") {
    return res.status(500).json({
      status: 'failed',
      message: createProduct_res.message
    });
  }

  const productId = createProduct_res.data.productId;

  const setChannel_res = await addProductToOnlineStore(storeUrl, accessToken, productId);
  const productUrl = await setChannel_res.data.productUrl;


  if (setChannel_res.status === "failed") {
    return res.status(500).json({
      status: 'failed',
      message: setChannel_res.message
    });
  }
  await PageCollection.findByIdAndUpdate(
    { _id: user.pages },
    { $push: { publishedPages: productPage._id } }
  );
  await PageCollection.findByIdAndUpdate(
    { _id: user.pages },
    { $delete: { unPublishedPages: productPage._id } }
  );

  await ProductPage.updateOne(
    { publicId: id },
    { publishUrl: productUrl })

  res.status(200).json({
    status: 'success',
    message: 'Product Page created successfully',
    productId,
    productUrl,
  });
};

export default shopifyPage;
