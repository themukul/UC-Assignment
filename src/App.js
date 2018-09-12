import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchImagesAction } from './actions/imageActions';
import { incrementSkipAction } from './actions/skipAction';
import { Col, Row, Grid } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showScrollToTop: false,
    }
  }

  componentWillMount() {
    window.addEventListener("scroll", (event) => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // you're at the bottom of the page
        this.loadMoreItems();
      }      
      let scroll = window.scrollY;
      if (scroll > 10) {
        this.setState({
          showScrollToTop: true
        });
      } else {
        this.setState({
          showScrollToTop: false
        });
      }
    });
  }

  paintImageMarkup = () => {
    return (
      this.props.imageReducer.map((value, index) => {
        return(
          <Col
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="image-wrap-col"
            key={value.id}
          >
            <Card>
              <CardActionArea>
                <CardMedia
                  style={{
                    height: 250
                  }}
                  image={value.url}
                />
                <CardContent>
                  <Typography 
                    style={{
                      height: 70
                    }}
                    gutterBottom 
                    variant="headline" 
                    component="h2"
                  >
                    {value.name}
                  </Typography>
                  {/* <Typography component="p">
                    {value.name}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Col>
        );
      })
    );
  }

  paintScrollToTop = () => {
    return (
      <div 
        className="scroll-top"
        onClick = {this.scrollToTop}
      >
        <Icon 
          style={{ 
            fontSize: 50,
            color: "white"
         }}
        >
          expand_less
        </Icon>
      </div>
    );
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  loadMoreItems = () => {
    this.props.dispatch(incrementSkipAction());
    this.props.dispatch(fetchImagesAction(this.props.skipReducer.count));
  }

  render() {
    return (
      <div>
        {this.state.showScrollToTop ? this.paintScrollToTop() : null}
        <Grid>
          <Row>
            {this.paintImageMarkup()}
          </Row>
        </Grid>
        <div
          style={{
            textAlign: "center",
            marginTop: 50,
            // marginBottom: 50,
          }}
        >
          <CircularProgress size={50} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    imageReducer: store.imageReducer,
    skipReducer: store.skipReducer
  }
}

export default connect(mapStateToProps)(App);