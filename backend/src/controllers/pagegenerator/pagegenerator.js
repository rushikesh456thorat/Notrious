import { requestToGemini } from '../../services/geminiService.js'; 
import isUrlValid from '../../utils/inputChecks.js';
import ProductPage from '../../models/productpage.model.js';
import PageCollection from '../../models/pagecollection.model.js';

// Dummy profile pool
const PLAN_LIMITS = {
  launch: 50,
  growth: 200,
  scale: Infinity,
};
const profilePool = [
  {
    name: "Alice Johnson",
    pic: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Bob Smith",
    pic: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Carol Martinez",
    pic: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "David Lee",
    pic: "https://randomuser.me/api/portraits/men/71.jpg"
  },
  {
    name: "Eva Brown",
    pic: "https://randomuser.me/api/portraits/women/19.jpg"
  },
  {
    name: "Frank Wilson",
    pic: "https://randomuser.me/api/portraits/men/11.jpg"
  },
  {
    name: "Grace Patel",
    pic: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    name: "Henry Chen",
    pic: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    name: "Irene Thompson",
    pic: "https://randomuser.me/api/portraits/women/50.jpg"
  },
  {
    name: "Jack Robinson",
    pic: "https://randomuser.me/api/portraits/men/28.jpg"
  }
];


const fetchProductDetails = async (productUrl) => {
  try {
    const response = await fetch(productUrl+'.json');
    const data = await response.json();
    return data.product;
  } catch (error) {
    throw new Error("Failed to fetch product details.");
  }
};

const transformProductData = (product) => ({
  title: product.title,
  body: product.body_html,
  vendor: product.vendor,
  tags: product.tags,
  images: product.images.map((img) => img.src),
  price: product.price,
});

const generateAllContent = async (title, body) => {
  const prompt = `
    Based on the following product title and description, generate the following in JSON:
    1. Two marketing paragraphs (60 words each) with titles.
    2. Ten customer reviews (40 words each), focusing on ease of use, design, durability, and value for money.
    3. Four to five key features (each max 3 words).
    4. A short product description (max 10 words).
    5. A 30-word footer description including features and a 30-day money-back guarantee.

    Title: ${title}
    Description: ${body}

    Return format:
    {
      paragraphs: { paragraph1: { text, title }, paragraph2: { text, title } },
      reviews: [ { review }, ... ],
      features: [ "feature1", "feature2", ... ],
      shortDescription: "...",
      footerDescription: "..."
    }
  `;

  const response = await requestToGemini(prompt);
  if (!response.isSuccess) throw new Error("Failed to generate content.");
  return JSON.parse(response.data.replace(/```json\n|\n```/g, '').trim());
};

const pageGenerator = async (req, res) => {
  try {
    const { productUrl } = req.body;
    const { id: publicId } = req.params;
    const user = req.user;
    


    if (!isUrlValid(productUrl)) {
      return res.status(400).json({ error: "Invalid URL" });
    }

    const productDetails = await fetchProductDetails(productUrl);
    const product = transformProductData(productDetails);
    const aiContent = await generateAllContent(product.title, product.body);

    const existingProductPage = await ProductPage.findOne({ publicId });
    if (!existingProductPage) {
      throw new Error(`ProductPage with publicId "${publicId}" does not exist.`);
    }

    // Shuffle profile pool to assign unique authors to reviews
    const shuffledProfiles = [...profilePool].sort(() => Math.random() - 0.5);

    const reviews = aiContent.reviews.map((r, i) => ({
      author: shuffledProfiles[i].name,
      content: r.review,
      profilePic: shuffledProfiles[i].pic,
      contentImage: product.images[i % product.images.length] || ''
    }));

    await ProductPage.updateOne(
      { publicId },
      {
        isGenerated: true,
        title: product.title,
        description: aiContent.shortDescription,
        price: 300,
        featuresLine: aiContent.features,
        paragraph: [aiContent.paragraphs.paragraph1.text, aiContent.paragraphs.paragraph2.text],
        paragraphTitles: [aiContent.paragraphs.paragraph1.title, aiContent.paragraphs.paragraph2.title],
        images: product.images,
        reviews,
        footerTitle: 'Unlock this amazing product with a 30-Day Guarantee!',
        footerDesc: aiContent.footerDescription,
      }
    );

    await PageCollection.findByIdAndUpdate(
      { _id: user.pages },
      { $push: { unPublishedPages: existingProductPage.id } }
    );

    req.usage.pagesCreated += 1;
    await req.usage.save();

    res.status(201).json({
      id: publicId,
      status: "success",
      message: "Product page created successfully",
      data: {
        title: product.title,
        description: aiContent.shortDescription,
        price: 300,
        featuresLine: aiContent.features,
        paragraph: [aiContent.paragraphs.paragraph1.text, aiContent.paragraphs.paragraph2.text],
        paragraphTitles: [aiContent.paragraphs.paragraph1.title, aiContent.paragraphs.paragraph2.title],
        images: product.images,
        reviews,
        footerTitle: 'Unlock this amazing product with a 30-Day Guarantee!',
        footerDesc: aiContent.footerDescription,
      }
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

export default pageGenerator;
