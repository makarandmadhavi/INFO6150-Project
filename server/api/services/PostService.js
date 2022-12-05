const post = require('../models/post');
const user = require('../models/user');



//Create Data
async function createPost(data) {
    var title = data.title;
    var address = data.address;
    var floorPlan = data.floorPlan;
    var description = data.description;
    var rating_list = data.rating_list;
    var QnA_List = data.QnA_List;
    var overall_rating = data.overall_rating;

    var result = {};

    await post.findOne({title : data.title }).then((doc) => {
        if (doc) {
                
            result.status = 400;
            result.message =  "User already exists with same title: " + title;
        } 
        else{
            var newPost = new post(data);

            newPost.save(function(message, data){
                if (message) {
                    console.log(message);
                    result.status = 500;
                    result.message =  "Post not created";
                    return;
                }
                result = data;
                // console.log("Answers in request " + QnA_List[0].answers);
                // console.log("Answers in result " + result.QnA_List[0].answers);
                console.log(message);
            });
            // result = data;
            
            result.status = 200;
            result.message = "Saved Successfully";
        }
    })
    
    
    return result;
    // return result;

}

// get data
async function getPost() {
    var result = {};
    await post.find().then(function(data, error) {
        if (error){
            console.log("Error Occured " + error);
            result.status = 500;
            result.message =  "could not get data " + data;
            return;
        }
        
        result = data;
        console.log("Result after data is assignered " + result);
        result.status = 200;
        console.log(result.status);
        result.message = "all done";
        return;
    });
    return result;
    
}


async function updatePost(userId, data) {
    // const id ={_id: userId };
    var result = {};
    try{
        let doc = await post.findByIdAndUpdate(userId , data, {returnOriginal: false });
        if (!doc){
            result.status = 400;
            result.message = "No record found";
            return result;
        }
        result = doc;
        result.status = 200;
        result.message = "Update Successfully";
        console.log(doc);
        return result;
    }
    catch(e){
        result.status = 500;
        result.message = "error occured while updating " + e;
        return result;
    }
    
}

async function deletePost(postId) {
    // let emailDelete = email;
    // console.log(emailDelete + "email delete in services");
    var result = {};
        await post.findByIdAndDelete(postId).then(function(doc, error){
            console.log("The document deleted is " + doc + " " + error);
            if(error){
                result.status = 500;
                result.message = "Delete failed! Try again.";
                console.log("Delete failed!");
            }
            if(!doc){
                result.status = 400;
                result.message = "No Record found!! Please check the details again.";
            }
            else{
                // result = doc;
                result.status = 200;
                result.message = "Data record deleted successfully";
            }
            // return result;
        });
        return result;
}

// Adding rating
async function addReview (postID, rating){
    var result = {};
    await post.findById(postID).then( async (doc, err) => {
        if(err){
            result.status = 500;
            result.message = "Error occured.";
            console.log("Error!! failed!");
        }
        if(!doc){
            result.status = 400;
            result.message = "No post record found!! Please check the details again.";
        }
        else{
            console.log(doc + "===========================DOC===============================");
            // console.log(doc.rating_list[0]);
            let list = doc.rating_list;
            // list.push(rating)
            
            doc.rating_list.push(rating);
            let updatedres = await post.findByIdAndUpdate(postID, doc,  {returnOriginal: false });
            if (!updatedres){
                result.status = 400;
                result.message = "Could not add review";
                return result;
            }
            result.status = 200;
            result.message = "Review Added";
            return result;
            // console.log(doc.rating_list.push(rating));

        }
    })
    return result;
}

//Delete rating
async function deleteRating (postID, reviewID){
    var result = {};
    await post.findById(postID).then(async (doc, err) => {
        if(err){
            result.status = 500;
            result.message = "Error occured.";
            console.log("Error!! failed!");
        }
        if(!doc){
            result.status = 400;
            result.message = "No Record found!! Please check the details again.";
        }
        else{
            await doc.rating_list.forEach((element,index, object) => {
                console.log(element._id + " ============================= "+ reviewID + " " + (element._id == reviewID));
                
                if (element._id == reviewID){
                    // console.log(element.review + " ============================= ");

                    object.splice(index,1);
                    result.status = 200;
                    return;
                }
                result.status = 400;
                result.message = "Did not find required review record";
                return result;
            });
            if (result.status != 400){
            let updatedres = await post.findByIdAndUpdate(postID, doc,  {returnOriginal: false });
            if (!updatedres){
                result.status = 400;
                result.message = "Could not delete review";
                return result;
            }
            result.status = 200;
            result.message = "Review Deleted";
            return result;      
            }     
         }
         return result;
    })
    return result;
}

//Get Reviews
async function getRating (postID){
    var result = {};
    await post.findById(postID).then(async (doc, err) => {
        if(err){
            result.status = 500;
            result.message = "Error occured.";
            console.log("Error!! failed!");
        }
        if(!doc){
            result.status = 400;
            result.message = "No Record found!! Please check the details again.";
        }
        else{
            result.list = doc.rating_list;     
            result.status = 200;
            result.message = "Reviews found";
         }
         return result;
    })
    return result;
}


//Add Question
async function addQuestion (postID, user_ID, question){
    var result = {};
    await post.findById(postID).then( async (doc, err) => {
        if(err){
            result.status = 500;
            result.message = "Error occured.";
            console.log("Error!! failed!");
        }
        if(!doc){
            result.status = 400;
            result.message = "No post record found!! Please check the details again.";
        }
        else{
            console.log(doc + "===========================DOC===============================");
            // console.log(doc.rating_list[0]);
            let list = doc.QnA_List;
            // list.push(rating)
            
            // doc.QnA_List.forEach(element => {
            //     if (element )
            // });
            if(doc.QnA_List.find((element) => {
                console.log(question);
                return element.question.value == question;
            })){
                result.status = 400;
                result.message = "Question Already exist";
                return result;
            }
            
                var Question = {};
                Question.question = {};
                Question.question.userID = user_ID;
                Question.question.value = question;
                doc.QnA_List.push(Question);
                
            
            let updatedres = await post.findByIdAndUpdate(postID, doc,  {returnOriginal: false });
            if (!updatedres){
                result.status = 400;
                result.message = "Could not add review";
                return result;
            }
            result.status = 200;
            result.message = "Question Added";
            return result;
            // console.log(doc.rating_list.push(rating));
        }
    })
    return result;
}

//Delete Question And Answers
async function deleteQuestionAns (postID, QnA_ID){
    var result = {};
    await post.findById(postID).then(async (doc, err) => {
        if(err){
            result.status = 500;
            result.message = "Error occured.";
            console.log("Error!! failed!");
        }
        if(!doc){
            result.status = 400;
            result.message = "No Record found!! Please check the details again.";
        }
        else{
            await doc.QnA_List.forEach((element,index, object) => {
                // console.log(element._id + " ============================= "+ QnA_ID + " " + (element._id == QnA_ID));
                
                if (element._id == QnA_ID){
                    // console.log(element.review + " ============================= ");

                    object.splice(index,1);
                    result.status = 200;
                    return;
                }
                result.status = 400;
                result.message = "Did not find required review record";
                return result;
            });
            if (result.status != 400){
            let updatedres = await post.findByIdAndUpdate(postID, doc,  {returnOriginal: false });
            if (!updatedres){
                result.status = 400;
                result.message = "Could not delete QnA";
                return result;
            }
            result.status = 200;
            result.message = "QnA Deleted";
            return result;      
            }     
         }
         return result;
    })
    return result;
}



module.exports = {
    createPost, 
    getPost,
    updatePost,
    deletePost,
    addReview,
    deleteRating,
    getRating,
    addQuestion,
    deleteQuestionAns
}