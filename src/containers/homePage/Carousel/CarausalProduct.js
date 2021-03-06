import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import {Card} from 'react-bootstrap';
const display={
  margin: "20px",
}
class CarousalProduct extends Component{
    state = {
        currentIndex: 0,
        itemsInSlide: 1,
        responsive: { 0: { items: window.screen.width <= 1000?2:4 }},
        galleryItems: this.galleryItems(),
      }
      galleryItems() {
        return (
            this.props.data.map((el,i)=>{
                return(
                    <Card onClick={()=>{this.setState({currentIndex:i})}} style={display}>
                        <div className="discountpercent">{el.discount}</div>
                        <Card.Img  style={{width:"200px"}} variant="top" src={el.src} />
                        <Card.Body>
                          {el.name}
                          <Card.Text>
                              {el.price}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">{el.odldPrice}</small>
                        </Card.Footer>
                    </Card>
                )
            })
        )
      }
    
      slidePrevPage = () => {
        const currentIndex = this.state.currentIndex - this.state.itemsInSlide
        this.setState({ currentIndex })
      }
    
      slideNextPage = () => {
        const { itemsInSlide, galleryItems: { length }} = this.state
        let currentIndex = this.state.currentIndex + itemsInSlide
        if (currentIndex > length) currentIndex = length
    
        this.setState({ currentIndex })
      }
    
      handleOnSlideChange = (event) => {
        const { itemsInSlide, item } = event
        this.setState({ itemsInSlide, currentIndex: item })
      }
    
      render() {
        const { currentIndex, galleryItems, responsive } = this.state
    
        return (
          <div >
              <div style={{display:"flex",justifyContent:"center"}}>
                  <Card style={{maxWidth:"20%"}}>
                        <div className="discountpercent">{this.props.data[this.state.currentIndex].discount}</div>
                        <Card.Img style={{width:"200px"}} variant="top" src={this.props.data[this.state.currentIndex].src} />
                        <Card.Body>
                        {this.props.data[this.state.currentIndex].name}
                        <Card.Text>
                            {this.props.data[this.state.currentIndex].price}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <small className="text-muted">{this.props.data[this.state.currentIndex].odldPrice}</small>
                        </Card.Footer>
                    </Card>

              </div>
            <AliceCarousel
              items={galleryItems}
              slideToIndex={currentIndex}
              responsive={responsive}
              onInitialized={this.handleOnSlideChange}
              onSlideChanged={this.handleOnSlideChange}
              onResized={this.handleOnSlideChange}
            />
            <button onClick={this.slidePrevPage}>Prev Page</button>
            <button onClick={this.slideNextPage}>Next Page</button>
          </div>
        )
      }
}

export default CarousalProduct