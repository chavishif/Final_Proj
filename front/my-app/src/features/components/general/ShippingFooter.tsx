import React from 'react';
import "../../../styles/shippingFooter.css"

const ShippingFooter = () => {
  return  (
    <div className="shipping-container">
      <h3 className="shipping-header">SHIPPING &amp; DELIVERY</h3>
      <p><strong>SHIPPING INFORMATION</strong></p>
      <p>We hope you love your REFY delivery - that's why we've made shipping as easy as possible. All of our shipping is tracked - you will receive confirmation of your tracking number once your order has been packed.</p>
      <p>For full information on all of our shipping rates by country please see below:</p>

      <table className="shipping-table">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Delivery Option</th>
            <th>Delivery Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>United Kingdom</td>
            <td>Standard Shipping</td>
            <td>1-3 Working Days</td>
            <td>£3.99</td>
          </tr>
          <tr>
            <td>United Kingdom</td>
            <td>Free Shipping Over £30.00</td>
            <td>1-3 Working Days</td>
            <td>FREE</td>
          </tr>
          <tr>
            <td>United Kingdom</td>
            <td>REFY Premium Delivery (Unlimited Delivery for 1 Year)</td>
            <td>1-3 Working Days</td>
            <td>£6.99</td>
          </tr>
          <tr>
            <td>Republic of Ireland</td>
            <td>Standard Shipping</td>
            <td>2-4 Working Days</td>
            <td>£3.99</td>
          </tr>
          <tr>
            <td>Republic of Ireland</td>
            <td>Duties &amp; Taxes paid by REFY</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>United States</td>
            <td>Express Shipping</td>
            <td>1-3 Working Days</td>
            <td>£5.99</td>
          </tr>
          <tr>
            <td>United States</td>
            <td>Duties &amp; Taxes paid by REFY</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Europe (Zone 1)</td>
            <td>Standard Delivery</td>
            <td>3-5 Working Days</td>
            <td>£5.99</td>
          </tr>
          <tr>
            <td>Europe (Zone 2)</td>
            <td>Standard Delivery</td>
            <td>3-5 Working Days</td>
            <td>£7.99</td>
          </tr>
          <tr>
            <td>Europe (Zone 3)</td>
            <td>Standard Delivery</td>
            <td>3-5 Working Days</td>
            <td>£14.99</td>
          </tr>
          <tr>
            <td>Europe</td>
            <td>Duties &amp; Taxes paid by REFY</td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
         </table>
         </table>

         <div className="shipping-container">
  <h2 className="shipping-header">CUSTOMS AND DUTIES</h2>
  <p className="shipping-note">Please note that if you are ordering from outside of the United Kingdom, you may be subject to import duties and taxes, which are issued once the package reaches your country. Any additional charges for customs clearance must be covered by you as we have no control over these charges.</p>
  <p className="shipping-note">Customs policies vary from country to country, so you should contact your local customs office for further information. When you order from refybeauty.com, you are considered the importer of the item and must comply with all laws and regulations of the country in which you are receiving the goods.</p>
  <p className="shipping-note">If you refuse to pay the duties and taxes applied to your order, your package will be returned to us. The cost of the return shipping and any duties or taxes incurred will be deducted from your refund.</p>
  <h2 className="shipping-header">RETURNS POLICY</h2>
  <p className="shipping-note">We hope you love your REFY products, but if for any reason you are not happy with your purchase, we offer a 14-day return policy.</p>
  <p className="shipping-note">To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Please email us at returns@refybeauty.com for instructions on how to process your return.</p>
  <p className="shipping-note">Once we have received your item, we will inspect it and notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If your refund is approved, we will initiate a refund to your original method of payment. The amount refunded will be the price of the item minus any shipping costs.</p>
  <p className="shipping-note">Please note that we are unable to refund any customs duties or taxes that may have been incurred as these are the responsibility of the recipient.</p>

CONTACT US
If you have any further questions about our shipping and delivery or our returns policy, please don't hesitate to contact us at info@refybeauty.com. We're always happy to help!
</div>
</div>

  )
};

export default ShippingFooter;