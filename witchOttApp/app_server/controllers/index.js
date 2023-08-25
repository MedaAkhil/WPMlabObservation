const homePageRouter = (req, res, next) => {
    res.render('index', { title: 'Witch' });
};
const moviePageRouter = (req, res, next) => {
    res.render('moviepage');
};
const webSeriesPage = (req, res, next) => {
    res.render('webseries');
}


module.exports = {
    homePageRouter,
    moviePageRouter,
    webSeriesPage,
};