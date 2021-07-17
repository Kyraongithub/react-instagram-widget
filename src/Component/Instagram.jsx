import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class Instagram extends Component {
  state = {
    id: "",
    caption: "",
    url: "",
    username: "",
  };

  componentDidMount() {
    const instagramData = () => {
      return new Promise((resolve) => {
        //id and caption
        const urlFetch = fetch(
          "https://graph.instagram.com/me/media?fields=id,caption&access_token=YOUR_ACCESS_TOKEN"
        );
        urlFetch.then((res) => {
          resolve(res.json());
        });
      });
    };
    const data = () => {
      return new Promise((resolve) => {
        instagramData().then((data) => {
          this.setState({
            caption: data.data[16].caption,
            id: data.data[16].id,
          });
          const { id } = this.state;
          const mediaFetch = fetch(
            `https://graph.instagram.com/${id}?fields=id,media_type,media_url,username,timestamp&access_token=YOUR_ACCESS_TOKEN`
          );
          mediaFetch.then((result) => {
            resolve(result.json());
          });
        });
      });
    };
    data().then((dat) => {
      this.setState({
        url: dat.media_url,
        username: dat.username,
      });
    });
  }
  render() {
    const { url, username, caption } = this.state;
    return (
      <div className="row">
        <div className="col-12 mt-3">
          <div
            className="card card-product"
            style={{ backgroundColor: "#fff7ec" }}
          >
            <div className="card-body">
              <h5 className="card-title ">Instagram</h5>
              <p className="card-text text-center">Follow us on Instagram</p>
              <Card
                style={{ width: "40vh" }}
                className="text-center d-inline-block"
              >
                <Card.Body>
                  <Card.Img variant="top" src={url} className="img-fluid" />
                  <Card.Title className="mb-2 mt-5 text-muted text-justify">
                    {username}
                  </Card.Title>
                  <hr />
                  <Card.Text className="text-justify">{caption}</Card.Text>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/bersowgames/"
                  >
                    <Button>View Profile</Button>
                  </a>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Instagram;
