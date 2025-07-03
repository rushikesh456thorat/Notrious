import ProductPage from "../../models/productpage.model.js";
import User from "../../models/user.model.js";
import PageCollection from "../../models/pagecollection.model.js";

export const deletepages = async (req, res) => {
  try {
    const { publicIds } = req.body; // expects an array of publicIds
    const userId = req.user.id;

    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return res.status(400).json({ message: "No publicIds provided" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const pageCollection = await PageCollection.findById(user.pages);
    if (!pageCollection) {
      return res.status(404).json({ message: "Page collection not found" });
    }

    // Get corresponding _ids from publicIds
    const pagesToDelete = await ProductPage.find({
      publicId: { $in: publicIds },
      ownedBy: userId,
    });

    const pageIds = pagesToDelete.map((page) => page._id.toString());

    // Delete from ProductPage collection
    await ProductPage.deleteMany({ _id: { $in: pageIds } });

    // Remove references from collection
    pageCollection.publishedPages = pageCollection.publishedPages.filter(
      (id) => !pageIds.includes(id.toString())
    );
    pageCollection.unPublishedPages = pageCollection.unPublishedPages.filter(
      (id) => !pageIds.includes(id.toString())
    );

    // Update counts
    pageCollection.publishedPagesCount = pageCollection.publishedPages.length;
    pageCollection.unPublishedPagesCount = pageCollection.unPublishedPages.length;

    await pageCollection.save();

    res.status(200).json({ message: "Pages deleted successfully" });
  } catch (error) {
    console.error("Error deleting pages:", error);
    res.status(500).json({ message: "Server error" });
  }
};
