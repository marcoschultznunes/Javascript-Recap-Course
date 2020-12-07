router.post('/', 
[
    body('title')
        .isString()
        .withMessage('Title must be a text value.')
        .isLength({min: 2, max: 150})
        .withMessage('Title must consist of 2-150 characters'),
    body('content')
        .isString()
        .withMessage('The content must be some text')
        .isLength({min: 2, max: 3000})
        .withMessage('Content must consist of 2-3000 characters'),
    body('imageUrl')
        .isURL()
        .withMessage('Invalid URL format for the image')
],
postController.createPost)

/*
    Response:

    Status: 422
    {
        "errors": [
            {
                "value": "blasonqodnqowdbqiowdbqowiebqowebuqwobuowrbqowrbquwrbquowrbqworbquwrbquowrbqwuorbquowrbouwrboqwbrquowbouqwbroqwbueiqwbeiqwubeiuqwbdiqwubduqwbdqwouudbqwodbqwodbqwdoqbwduqwbuieqbwuieqbwuiebwuiebqiuwbiquwrviqwurvqwuirvqiwurv",
                "msg": "Title must consist of 2-150 characters",
                "param": "title",
                "location": "body"
            },
            {
                "value": "E",
                "msg": "Content must consist of 2-3000 characters",
                "param": "content",
                "location": "body"
            }
        ]
    }
*/