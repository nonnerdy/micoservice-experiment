// src/components/ProductCarousel.js
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // You may need to install this via npm

function ProductCarousel({ products }) {
    return (
        <Carousel>
            {products.map((product) => (
                <div key={product.id}>
                    <img src={product.image} alt={product.name} />
                    <p className="legend">{product.name}</p>
                </div>
            ))}
        </Carousel>
    );
}

export default ProductCarousel;
