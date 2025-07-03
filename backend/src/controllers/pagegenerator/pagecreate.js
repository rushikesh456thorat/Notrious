import { v4 as uuidv4 } from 'uuid';
import ProductPage from "../../models/productpage.model.js";


const pageCreate = async (req, res) => {
    const user = req.user

    let i = 0

    while (i != 5) {
        const publicId = uuidv4()
        const page = await ProductPage.findOne({publicId: publicId})
        if (!page) {
            const newProductPage = new ProductPage({
                publicId,
                ownedBy: user._id
            })
            try {
                await newProductPage.save();
                res.status(201).json({
                    id: newProductPage.publicId,
                    status: 'success',
                    message: "Product page created Succesful"
                });
                return
            } catch (error) {
                res.status(500).json({
                    status: "fail",
                    message: `Failed to save product page. Error: ${error}`
                });
                return
            }
        }
        i+=1;
    }





}
export default pageCreate