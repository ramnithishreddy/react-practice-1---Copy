/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./footer.css";

export default function Footer() {
  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="navLeftFooter nav-sprite-v1" id="navFooter">
      <a
        id="navBackToTop"
        href="#"
        onClick={topFunction()}
        aria-label="Back to top"
      >
        <div className="navFooterBackToTop">
          <span className="navFooterBackToTopText">Back to top</span>
        </div>
      </a>

      <div
        className="navFooterVerticalColumn navAccessibility"
        role="presentation"
      >
        <div
          className="navFooterVerticalRow navAccessibility"
          style={{ display: "table-row" }}
        >
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead">Get to Know Us</div>
            <ul>
              <li className="nav_first">
                <a href="#" className="nav_a">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Press Releases
                </a>
              </li>
              <li className="nav_last ">
                <a href="#" className="nav_a">
                  Amazon Science
                </a>
              </li>
            </ul>
          </div>
          <div className="navFooterColSpacerInner navAccessibility"></div>
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead">Connect with Us</div>
            <ul>
              <li className="nav_first">
                <a
                  href="https://www.amazon.in/gp/redirect.html/ref=footer_fb?location=http://www.facebook.com/AmazonIN&amp;token=2075D5EAC7BB214089728E2183FD391706D41E94&amp;6"
                  className="nav_a"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.amazon.in/gp/redirect.html/ref=footer_twitter?location=http://twitter.com/AmazonIN&amp;token=A309DFBFCB1E37A808FF531934855DC817F130B6&amp;6"
                  className="nav_a"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className="nav_last ">
                <a
                  href="https://www.amazon.in/gp/redirect.html?location=https://www.instagram.com/amazondotin&amp;token=264882C912E9D005CB1D9B61F12E125D5DF9BFC7&amp;source=standards"
                  className="nav_a"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="navFooterColSpacerInner navAccessibility"></div>
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead">Make Money with Us</div>
            <ul>
              <li className="nav_first">
                <a
                  href="/b/?node=2838698031&amp;ld=AZINSOANavDesktopFooter_C&amp;ref_=nav_footer_sell_C"
                  className="nav_a"
                >
                  Sell on Amazon
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Sell under Amazon Accelerator
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Protect and Build Your Brand
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Amazon Global Selling
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Become an Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Fulfilment by Amazon
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Advertise Your Products
                </a>
              </li>
              <li className="nav_last ">
                <a href="#" className="nav_a">
                  Amazon Pay on Merchants
                </a>
              </li>
            </ul>
          </div>
          <div className="navFooterColSpacerInner navAccessibility"></div>
          <div className="navFooterLinkCol navAccessibility">
            <div className="navFooterColHead">Let Us Help You</div>
            <ul>
              <li className="nav_first">
                <a href="#" className="nav_a">
                  COVID-19 and Amazon
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Your Account
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Returns Centre
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  100% Purchase Protection
                </a>
              </li>
              <li>
                <a href="#" className="nav_a">
                  Amazon App Download
                </a>
              </li>
              <li className="nav_last ">
                <a href="#" className="nav_a">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="nav-footer-line"></div> */}

      <div className="navFooterLine navFooterLinkLine navFooterPadItemLine">
        <span>
          <div className="navFooterLine navFooterLogoLine">
            <a aria-label="Amazon India Home" href="/ref=footer_logo">
              <div className="nav-logo-base nav-sprite"></div>
            </a>
          </div>
        </span>

        <span className="icp-container-desktop">
          <div className="navFooterLine">
            <a
              href="/customer-preferences/edit?ie=UTF8&amp;preferencesReturnUrl=%2Fref%3Dap_frn_logo&amp;ref_=footer_lang"
              aria-label="Choose a language for shopping."
              className="icp-button"
              id="icp-touch-link-language"
            >
              <div className="icp-nav-globe-img-2 icp-button-globe-2"></div>
              <span className="icp-color-base">English</span>
              <span className="nav-arrow icp-up-down-arrow"></span>
            </a>
          </div>
        </span>
      </div>

      <div className="navFooterLine navFooterLinkLine navFooterPadItemLine">
        <ul>
          <li className="nav_first">
            <a href="https://www.amazon.com.au/ref=footer_au" className="nav_a">
              Australia
            </a>
          </li>
          <li>
            <a href="https://www.amazon.com.br/ref=footer_br" className="nav_a">
              Brazil
            </a>
          </li>
          <li>
            <a href="https://www.amazon.ca/ref=footer_ca" className="nav_a">
              Canada
            </a>
          </li>
          <li>
            <a href="https://www.amazon.cn/ref=footer_cn" className="nav_a">
              China
            </a>
          </li>
          <li>
            <a href="https://www.amazon.fr/ref=footer_fr" className="nav_a">
              France
            </a>
          </li>
          <li>
            <a href="https://www.amazon.de/ref=footer_de" className="nav_a">
              Germany
            </a>
          </li>
          <li>
            <a href="https://www.amazon.it/ref=footer_it" className="nav_a">
              Italy
            </a>
          </li>
          <li>
            <a href="https://www.amazon.co.jp/ref=footer_jp" className="nav_a">
              Japan
            </a>
          </li>
          <li>
            <a href="https://www.amazon.com.mx/ref=footer_mx" className="nav_a">
              Mexico
            </a>
          </li>
          <li>
            <a href="https://www.amazon.nl/ref=footer_nl" className="nav_a">
              Netherlands
            </a>
          </li>
          <li>
            <a href="https://www.amazon.pl/ref=footer_pl" className="nav_a">
              Poland
            </a>
          </li>
          <li>
            <a href="https://www.amazon.sg/ref=footer_sg" className="nav_a">
              Singapore
            </a>
          </li>
          <li>
            <a href="https://www.amazon.es/ref=footer_es" className="nav_a">
              Spain
            </a>
          </li>
          <li>
            <a href="https://www.amazon.com.tr/ref=footer_tr" className="nav_a">
              Turkey
            </a>
          </li>
          <li>
            <a href="https://www.amazon.ae/ref=footer_ae" className="nav_a">
              United Arab Emirates
            </a>
          </li>
          <li>
            <a href="https://www.amazon.co.uk/ref=footer_uk" className="nav_a">
              United Kingdom
            </a>
          </li>
          <li className="nav_last">
            <a href="https://www.amazon.com/ref=footer_us" className="nav_a">
              United States
            </a>
          </li>
        </ul>
      </div>

      <div
        className="navFooterLine navFooterLinkLine navFooterDescLine"
        aria-label="More on Amazon"
      >
        <table
          className="navFooterMoreOnAmazon"
          cellSpacing="0"
          summary="More on Amazon"
        >
          <tbody>
            <tr>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  AbeBooks
                  <br />
                  <span className="navFooterDescText">
                    Books, art
                    <br />
                    &amp; collectibles
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Amazon Web Services
                  <br />
                  <span className="navFooterDescText">
                    Scalable Cloud
                    <br />
                    Computing Services
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Audible
                  <br />
                  <span className="navFooterDescText">
                    Download
                    <br />
                    Audio Books
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  IMDb
                  <br />
                  <span className="navFooterDescText">
                    Movies, TV
                    <br />
                    &amp; Celebrities
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Shopbop
                  <br />
                  <span className="navFooterDescText">
                    Designer
                    <br />
                    Fashion Brands
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Amazon Business
                  <br />
                  <span className="navFooterDescText">
                    Everything For
                    <br />
                    Your Business
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Prime Now
                  <br />
                  <span className="navFooterDescText">
                    {" "}
                    2-Hour Delivery
                    <br />
                    on Everyday Items
                  </span>
                </a>
              </td>
              <td className="navFooterDescSpacer" style={{ width: "4%" }}></td>
              <td className="navFooterDescItem">
                <a href="#" className="nav_a">
                  Amazon Prime Music
                  <br />
                  <span className="navFooterDescText">
                    100 million songs, ad-free
                    <br />
                    Over 15 million podcast episodes{" "}
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="navFooterLine navFooterLinkLine navFooterPadItemLine navFooterCopyright">
        <ul>
          <li className="nav_first">
            <a href="#" id="" className="nav_a">
              Conditions of Use &amp; Sale
            </a>{" "}
          </li>
          <li>
            <a href="#" id="" className="nav_a">
              Privacy Notice
            </a>{" "}
          </li>
          <li className="nav_last">
            <a href="#" id="" className="nav_a">
              Interest-Based Ads
            </a>{" "}
          </li>
        </ul>
        <span>
          © 2023-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
        </span>
      </div>
    </div>
  );
}
