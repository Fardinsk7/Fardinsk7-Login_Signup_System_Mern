//function to create image to base64 
export default function converttoBase64(file){
    return new Promise((resolve,reject)=>{
        //FileReader in javascript use to read data of file and read data of file which is taken as a input from the user's computer and read the data
        const fileReader = new FileReader();
        
        fileReader.readAsDataURL(file)

        fileReader.onload = ()=>{
            resolve(fileReader.result)// the result attribute of FileReader object contain the readed data of the given file
        }
        fileReader.onerror = (error)=>{
            reject(error)
        }
    })
}