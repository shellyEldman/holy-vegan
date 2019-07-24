const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

const buildRecipe = (recipe, recipeId) => {
    return '<!DOCTYPE html><head>' +
        // <!-- Global site tag (gtag.js) - Google Analytics -->
        '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-143770729-1"></script>' +
        '<script>' +
            'window.dataLayer = window.dataLayer || [];' +
            'function gtag(){dataLayer.push(arguments);}' +
            'gtag(\'js\', new Date());' +
            'gtag(\'config\', \'UA-143770729-1\');' +
        '</script>' +
        '<link rel="canonical" href="https://holy-vegan.web.app/recipes/id/' + recipeId.toString() + '"/>' +
        '<title>' + recipe.recipeName + ' מתכון טבעוני | הולי ויגן</title>' +
        '<meta name="title" content="' + recipe.recipeName + ' מתכון טבעוני | הולי ויגן">' +
        '<meta name="description" content="' + recipe.introduction + '"/>' +
        '<meta name="robots" content="index,nofollow">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1"/>' +
        '<style>' +
            '.op {opacity: 0}' +
        '</style>' +
        //     <!-- Open Graph / Facebook -->
        '<meta property="og:type" content="website">' +
        '<meta property="og:url" content="https://holy-vegan.web.app/recipes/id/' + recipeId.toString() + '">' +
        '<meta property="og:title" content="' + recipe.recipeName + ' מתכון טבעוני | הולי ויגן">' +
        '<meta property="og:description" content="' + recipe.introduction + '"/>' +
        '<meta property="og:image" content="' + recipe.imgUrl + '"/>' +
        '<meta property="og:site_name" content="הולי ויגן">' +
        //     <!-- Twitter -->
        '<meta property="twitter:card" content="summary_large_image">' +
        '<meta property="twitter:url" content="https://holy-vegan.web.app/recipes/id/' + recipeId.toString() + '">' +
        '<meta property="twitter:title" content="' + recipe.recipeName + ' מתכון טבעוני | הולי ויגן">' +
        '<meta property="twitter:description" content="' + recipe.introduction + '"/>' +
        '<meta property="twitter:image" content="' + recipe.imgUrl + '"/>' +
        '</head><body>' +
        '<h1 class="op">' + recipe.recipeName + ' מתכון טבעוני | הולי ויגן</h1>' +
        '<h2 class="op">מתכונים טבעוניים</h2>' +
        '<h3 class="op">' + recipe.recipeName + '</h3>' +
        '<h2 class="op">מתכון טבעוני</h2>' +
        '<h1 class="op">הולי ויגן</h1>' +
        '<p class="op">' + recipe.introduction + '</p>' +
        '<script>window.location.assign("https://holy-vegan.web.app/recipes/' + recipeId.toString() + '");</script>' +
        '</body></html>';
};


exports.recipe = functions.https.onRequest((req, res) => {
    const path = req.path.split('/');
    const recipeId = path[3];
    const docRef = db.collection("recipes").doc(recipeId);
    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return res.send('Not Found')
            }
            const recipe = doc.data();
            const htmlString = buildRecipe(recipe, recipeId);
            return res.status(200).end(htmlString);
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
});

// const buildContact = () => {
//     return '<!DOCTYPE html><head>' +
//         // <!-- Global site tag (gtag.js) - Google Analytics -->
//         '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-143770729-1"></script>' +
//         '<script>' +
//         'window.dataLayer = window.dataLayer || [];' +
//         'function gtag(){dataLayer.push(arguments);}' +
//         'gtag(\'js\', new Date());' +
//         'gtag(\'config\', \'UA-143770729-1\');' +
//         '</script>' +
//         '<title>הולי ויגן | יצירת קשר</title>' +
//         '<meta name="title" content="הולי ויגן | יצירת קשר" />' +
//         '<meta name="description" content="צור קשר עם הולי-ויגן"/>' +
//         '<meta name="robots" content="index,nofollow">' +
//         '<meta name="viewport" content="width=device-width, initial-scale=1"/>' +
//         '<style>' +
//         '.op {opacity: 0}' +
//         '</style>' +
//
//         '</head><body>' +
//         '<h1 class="op">הולי ויגן - יצירת קשר</h1>' +
//         '<h2 class="op">הולי ויגן צור קשר</h2>' +
//         '<script>window.location.assign("https://holy-vegan.web.app/contact");</script>' +
//         '</body></html>';
// };
//
// exports.contact =  functions.https.onRequest((req, res) => {
//     const htmlString = buildContact();
//     return res.status(200).end(htmlString);
// });
