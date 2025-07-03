import ProductPage from "../../models/productpage.model.js";

const updatePageData = async (req, res) => {
  const { type, newData, index, subField } = req.body;
  const { id } = req.params;
  const user = req.user;

  try {
    const page = await ProductPage.findOne({ publicId: id });
    if (!page) {
      return res.status(404).json({
        isSuccess: "fail",
        message: "Product page does not exist",
      });
    }

    if (page.ownedBy.toString() !== user._id.toString()) {
      return res.status(401).json({
        isGenerated: false,
        message: "Unauthorized Access!",
      });
    }

    
    if (index === -1) {

      await ProductPage.updateOne(
        { publicId: id },
        { [type]: newData }
      );
    } else if (subField) {
      const path = `${type}.${index}.${subField}`;
      await ProductPage.updateOne(
        { publicId: id },
        { $set: { [path]: newData } }
      );
    } else {
      const path = `${type}.${index}`;
      await ProductPage.updateOne(
        { publicId: id },
        { $set: { [path]: newData } }
      );
    }

    return res.status(200).json({
      isSuccess: "success",
      message: `${type} updated successfully!`,
    });
  } catch (error) {
    console.error("Error updating product page:", error);
    return res.status(500).json({
      isSuccess: "fail",
      message: "Sorry! Server Error.",
    });
  }
};

export default updatePageData;
