

const isUrlValid = (Url) => {
      try{
        new URL(Url);
        return true;
      } catch(err){
        return false
      }
}

export default isUrlValid
