import Carousel from 'react-bootstrap/Carousel';
import sofa from "../../../images/Posted_Images/34-gray-couch-living-room-ideas-inc_-photos-2_optimized_1.jpg"
import table from "../../../images/Posted_Images/coffee-table-boxer-set-of-2---industrial-design-2_optimized.jpg"
import closet from "../../../images/Posted_Images/home-decor-wooden-cupboard-design-ideas---gn-ideas-2_optimized.jpg"
import "../../../styles/homepage.css"
import { Row } from 'react-bootstrap';
function HomePage() {
  return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={sofa} width={200} height={400}
          alt="First slide"
        />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={table} width={200} height={400}
          alt="Second slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={closet} width={200} height={400}
          alt="Third slide"
        />

        <Carousel.Caption>
        
        </Carousel.Caption>
        </Carousel.Item>

      
    </Carousel>
  <div className="product-categories__img-wrap">
    <Row>
  <a href="/category/Sofas">

  <img
    className="product-categories__img entered lazyloaded"
    src="https://www.kaza.co.il/wp-content/uploads/2020/08/home_icon_product2.jpg"
    alt="sofas"
    width="270"
    height="100"
    data-lazy-src="https://www.kaza.co.il/wp-content/uploads/2020/08/home_icon_product2.jpg"
    data-ll-status="loaded"
  />
</a>
<h3><center>Sofas</center></h3>
</Row>
<Row>

<a href="/category/Chairs">
  <img
    className="product-categories__img"
    src="https://www.kaza.co.il/wp-content/uploads/2020/08/home_icon_product4.jpg"
    alt="chairs"
    width="270"
    height="100"
  />
</a>
<h3><center>Chairs</center></h3>
</Row>
<Row>

<a href="/category/Tables">
  <img
    className="product-categories__img"
    src="https://www.kaza.co.il/wp-content/uploads/2020/08/home_icon_product18.jpg"
    alt="tables"
    width="270"
    height="100"
  />
</a>
<h3><center>Tables</center></h3>
</Row>
<Row>

<a href="/category/Closets">
  <img
    className="product-categories__img"
    src="https://valentino.co.il/wp-content/uploads/2020/02/HR2320-CLOSED-300DPI_-scaled-e1592210401259-916x1024.jpg"
    alt="closets"
    width="270"
    height="100"
  />
</a>
<h3><center>Closets</center></h3>
</Row>
</div>
</div>
  );
}

export default HomePage;