import React, { Component } from 'react'
import './GoodZoom.css';
import { Card,Table } from 'react-bootstrap';

class GoodZoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            hide: true
        };
    }
    render() {
        const imageZoom = () => {
            var img, lens, result, cx, cy;
            img = this.refs.myimage;
            result = this.refs.myresult;
            lens = this.refs.lens
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
            lens.addEventListener("mousemove", moveLens);
            img.addEventListener("mousemove", moveLens);
            lens.addEventListener("touchmove", moveLens);
            img.addEventListener("touchmove", moveLens);
            function moveLens(e) {
                var pos, x, y;
                e.preventDefault();
                pos = getCursorPos(e);
                x = pos.x - (lens.offsetWidth / 2);
                y = pos.y - (lens.offsetHeight / 2);
                if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
                if (x < 0) { x = 0; }
                if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
                if (y < 0) { y = 0; }
                lens.style.left = x + "px";
                lens.style.top = y + "px";
                result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
            }
            function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                a = img.getBoundingClientRect();
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return { x: x, y: y };
            }
        }
        const handleClick = (i) => {
            this.setState({ currentIndex: i });
            setTimeout(imageZoom(), 300)
        }
        const handlehide = () => {
            
            this.setState({ hide: true })
            imageZoom()
        }
        const handleShow = () => {
            this.setState({ hide: false })
        }
        return (
            <div className="img-zoom-container">
                <div id="img-zoom-container">
                    <div >
                        <div id="imgToZoom"  onMouseOver={handleShow} onMouseOut={handlehide}>
                            <div className="img-zoom-lens" ref="lens"/>
                            <img id="myimage" src={this.props.data[this.state.currentIndex]} width="300" height="240" ref="myimage" />
                            <img id="normalImg" src={this.props.data[this.state.currentIndex]} width="300" height="240" />
                        </div>

                        <div className="zommGalary">
                            {this.props.data.map((el, i) => {
                                return (
                                    <img onClick={() => { handleClick(i) }} src={el} width="80" height="50" />
                                )
                            })}
                        </div>
                    </div>

                    <div style={{ display: this.state.hide ? "none" : "", margin: "20px" }} id="myresult" ref="myresult" className="img-zoom-result" />
                    <div style={{ display: !this.state.hide ? "none" : "", margin: "20px" }}>
                        <Card style={{ width: '18rem', margin: "20px" }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
            </div>
        )
    }
}
export default GoodZoom
