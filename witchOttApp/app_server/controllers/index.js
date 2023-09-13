// const request = require('request');



// const apiOptions = {
//     server: 'http://localhost:3000'
// };
// if (process.env.NODE_ENV === 'production') {
//     apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
// }

// const homePageRouter = (req, res, next) => {
//     res.render('index', { title: 'Witch' });
// };
// const moviePageRouter = (req, res, next) => {
//     res.render('moviepage');
// };
// const webSeriesPage = (req, res, next) => {
//     res.render('webseries');
// }


// module.exports = {
//     homePageRouter,
//     moviePageRouter,
//     webSeriesPage,
// };












const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://witch.cyclic.cloud';
}


const showError = (req, res, status) => {
  let title = '';
  let content = '';

  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear, Looks like we can\'t find this page. Sorry';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};





const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  res.render('index',{responseBody,message}
  );
};

const homePage = (req, res) => {
  const path = '/api/movies';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if (statusCode === 200 && body.length) {
        data = body.map( (item) => {
          item.distance = item.distance;
          return item;
        });
      }
      renderHomepage(req, res, data);
    }
  );
};





const renderMoviePage = (req, res, responseBody) => {   
  console.log(4);
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    console.log(10);
    // responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  res.render('moviepage',{responseBody,message});
  console.log(responseBody);
  console.log(5);
};

const moviesPage = async (req, res) => {
  body=[];
  console.log(1);
  const path = '/api/movies';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
  console.log(2);
    await request(
  requestOptions,
  (err, {statusCode}, body) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error, e.g., display an error message on the front end
      return;
    }

    if (statusCode === 200 && body.length) {
      console.log(body);
      // Process and render the data
      // renderMoviePage(req,res,body);
      renderMoviePage(req,res,body)
    } else {
      console.log(3);
      // Handle the case where the response is not as expected
      console.error('Unexpected response:', statusCode, body);
      console.log("error");
      // Display an appropriate message on the front end
    }
  },
  
);
}


const renderWebSeriesPage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No Movies found!';
    }
  }
  res.render('webseries',{responseBody});
};
const webSeriesPage = (req, res) => {
  const path = '/api/webseries';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      let data = [];
      if (statusCode === 200 && body.length) {
        data = body.map( (item) => {
          return item;
        });
      }
      renderWebSeriesPage(req, res, data);
    }
  );
}




const renderDetailPage = (req, res, location) => {
  res.render('location-info',
    {
      title: location.name,
       pageHeader: {
        title: location.name,
      },
      sidebar: {
        context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
        callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
      },
      location
    }
  );
};

const getLocationInfo = (req, res, callback) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, {statusCode}, body) => {
      const data = body;
      if (statusCode === 200) {
        data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        }
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  );
};

const locationInfo = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderDetailPage(req, res, responseData)
  );
};

const renderReviewForm = (req, res, {name}) => {
  res.render('location-review-form',
    {
      title: `Review ${name} on Loc8r` ,
      pageHeader: { title: `Review ${name}` },
      error: req.query.err
    }
  );
};

const addReview = (req, res) => {
  getLocationInfo(req, res,
    (req, res, responseData) => renderReviewForm(req, res, responseData)
  );
};

const doAddReview = (req, res) => {
  const locationid = req.params.locationid;
  const path = `/api/locations/${locationid}/reviews`;
  const postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect(`/location/${locationid}/review/new?err=val`);
  } else {
    request(
      requestOptions,
      (err, {statusCode}, {name}) => {
        if (statusCode === 201) {
          res.redirect(`/location/${locationid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/location/${locationid}/review/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};

module.exports = {
  homePage,
  moviesPage,
  webSeriesPage,
  addReview,
  doAddReview,
};