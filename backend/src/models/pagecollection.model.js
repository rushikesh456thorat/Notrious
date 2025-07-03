import mongoose from "mongoose";

const pageCollectionSchema = new mongoose.Schema({

    

    publishedPages:{
        type:[String],
        default:[]
        
    },
    unPublishedPages:{
        type:[String],
        default:[]
        
    },
    publishedPagesCount:{
        type:Number,
        default:0
        
    },
    unPublishedPagesCount:{
        type:Number,
        default:0
        
    },
    totalPagesCount:{
        type:Number,
        default:0
    }


})

pageCollectionSchema.pre('save',function (next) {
    this.publishedPagesCount = this.publishedPages.length;
    this.unPublishedPagesCount = this.unPublishedPages.length;
    this.totalPagesCount = this.unPublishedPagesCount + this.publishedPagesCount;
    next();
});
pageCollectionSchema.post('findOneAndUpdate', async function (doc) {
    if (doc) {
      const updatedDoc = await this.model.findById(doc._id); // Re-fetch the updated document
      updatedDoc.publishedPagesCount = updatedDoc.publishedPages.length;
      updatedDoc.unPublishedPagesCount = updatedDoc.unPublishedPages.length;
      updatedDoc.totalPagesCount =
        updatedDoc.unPublishedPagesCount + updatedDoc.publishedPagesCount;
  
      await updatedDoc.save(); // Save the updated counts
    }
  });

const PageCollection = mongoose.model('PageCollection', pageCollectionSchema);
export default PageCollection;