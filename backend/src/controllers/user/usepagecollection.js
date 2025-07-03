import ProductPage from "../../models/productpage.model.js";
import User from "../../models/user.model.js";
import PageCollection from "../../models/pagecollection.model.js";

export const getPagesTableData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("pages");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const collection = await PageCollection.findById(user.pages);
    if (!collection) {
      throw new Error("Page collection not found");
    }

    // Fetch only pages owned by user and isGenerated: true
    const allPages = await ProductPage.find({ 
      ownedBy: userId, 
      isGenerated: true 
    });

    // Create a Set for faster lookup
    const publishedSet = new Set(collection.publishedPages.map(id => id.toString()));

    // Transform and filter
    const formattedPages = allPages.map(page => ({
      id: page.publicId,
      product: page.title,
      store: "Shopify",
      category: "General",
      published: publishedSet.has(page._id.toString()),
      image: page.images[0] || "",
    }));

    // Compute counts
    const totalCount = formattedPages.length;
    const publishedCount = formattedPages.filter(p => p.published).length;
    const notPublishedCount = totalCount - publishedCount;

    res.status(200).json({
      pages: formattedPages,
      counts: {
        all: totalCount,
        published: publishedCount,
        notPublished: notPublishedCount,
      },
    });

  } catch (error) {
    console.error("Error fetching pages table:", error);
    res.status(500).json({ message: "Server error" });
  }
};
