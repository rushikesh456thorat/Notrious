import PageCollection from "../../models/pagecollection.model.js";
import ProductPage from "../../models/productpage.model.js";


const getPagePublishStatus = async(req,res) =>{
    const {publicId} = req.params;
    const user = req.user;

    if(!user){
        return res.status(401).json({
            status:'fail',
            message:'Unauthrized access!'
        })
    }

    if(!publicId){
        return res.status(400).json({
            status:'fail',
            message:'Page id missing'

        })
    }

    const page = await ProductPage.findOne({publicId:publicId});
    if(!page){
        return res.status(404).json({
            status:'fail',
            message:'Page not found'
        })

    }

    const collection = await PageCollection.findById(user.pages)
    if(!collection){
        return res.status(404).json({
            status:'fail',
            message:'User collection not found'
        })
    }

    const index =  collection.publishedPages.indexOf(page._id)
    if (index == -1){
        return res.status(200).json({
            status:'success',
            message:'Page is not published',
            isPublished:false
        })
    }else{

           return res.status(200).json({
            status:'success',
            message:'Page is published',
            isPublished:true,
            previewUrl:page.publishUrl
        })

    }

}
export default getPagePublishStatus