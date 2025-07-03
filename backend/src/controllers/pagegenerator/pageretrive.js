
import PageCollection from "../../models/pagecollection.model.js";
import ProductPage from "../../models/productpage.model.js";

const pageRetrive = async (req, res) => {

    const { id: pageId } = req.params;
    const user = req.user;

      

    const page = await ProductPage.findOne({ publicId: pageId }).select(['-publicId', '-__v'])

    if (!page) {
        return res.status(404).json({
            isGenerated: false,
            message: "Page not found"
        });
    }

    if (page.isGenerated == false) {
        return res.status(201).json(
            {
                isGenerated: false,
                message: "Page is not Generated"
            }
        )
    }
    console.log(page.ownedBy,user._id)
    if (page.ownedBy.toString() != user._id.toString()){
        return res.status(401).json({
            isGenerated: false,
            message: "Unauthorized Access!"
        });
    }

    let collection

    try {
        collection = await PageCollection.findById(user.pages)
        if (!collection) {
            return res.status(404).json({
                isGenerated: false ,
                message: "Unauthorized Access!"
            });
        }
    } catch (error) {
        return res.status(400).json({
            isGenerated: false,
            message: "Something went wrong!"
        })
    }
 

    

    const isPublished = collection.publishedPages.includes(page._id);
     
    const pageData = page.toObject();
    delete pageData.isGenerated;
    delete pageData._id;
    delete pageData.ownedBy;



    return res.json({
        isGenerated: true,
        data: pageData,
        isPublished: isPublished
    });



}

export default pageRetrive