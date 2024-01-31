/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./assets/img/resource-logo.png";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const Loc = useLocation();
  // const [userInfo, setUserInfo] = useState(Loc.state);

  useEffect(() => {
    setUserInfo(Loc.state);
  }, [Loc.state]);

  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    // <div classNameName="banner App">
    //   {/* <section id="hero">
    //     <div classNameName="container">
    //       <div classNameName="row gy-4">
    //         <div classNameName="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
    //           {isLogin && match ? (
    //             <h1>
    //               Welcome {match.Name}, Organize your work and life, finally.
    //             </h1>
    //           ) : isLogin && match1 ? (
    //             <h1>Welcome Admin, Organize your work and life, finally.</h1>
    //           ) : (
    //             <h1>
    //               Welcome, SignUp to Organize your work and life, finally.
    //             </h1>
    //           )}
    //           <h2>
    //             Become focused, organized, and calm with Todoist. The world’s #1
    //             task manager and to-do list app.
    //           </h2>
    //           {!isLogin ? (
    //             <div>
    //               <a classNameName="btn-get-started scrollto" href="/Signup">
    //                 Get Started
    //               </a>
    //             </div>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //         <div classNameName="col-lg-6 order-1 order-lg-2 hero-img">
    //           <img src="" classNameName="img-fluid" alt="hero-img" />
    //         </div>
    //       </div>
    //     </div>
    //   </section> */}
    //   <h1>Resource Support Team</h1>
    //   <div classNameName="container">
    //     <nav classNameName="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    //       <Link classNameName="navbar-brand" to="/">
    //         <HomeIcon fontSize="large" color="Dark" />
    //       </Link>
    //       <button
    //         classNameName="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#navbarNav"
    //         aria-controls="navbarNav"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span classNameName="navbar-toggler-icon"></span>
    //       </button>
    //       <div classNameName="collapse navbar-collapse" id="navbarNav">
    //         <ul classNameName="navbar-nav">
    //           {!userInfo ? (
    //             <>
    //               <li classNameName="nav-item">
    //                 <Link classNameName="nav-link" to="/Login">
    //                   Login
    //                 </Link>
    //               </li>
    //               <li classNameName="nav-item">
    //                 <Link classNameName="nav-link" to="/Signup">
    //                   SignUp
    //                 </Link>
    //               </li>
    //             </>
    //           ) : (
    //             <>
    //               <li classNameName="nav-item">
    //                 <Link classNameName="nav-link" to="/Tickets">
    //                   Tickets
    //                 </Link>
    //               </li>
    //               <li classNameName="nav-item">
    //                 <Link classNameName="nav-link" to="/Issue">
    //                   Issue
    //                 </Link>
    //               </li>
    //               <li classNameName="nav-item">
    //                 <Link classNameName="nav-link" to="/Logout">
    //                   <LogoutIcon />
    //                 </Link>
    //               </li>
    //               {/* <Outlet /> */}
    //             </>
    //           )}
    //         </ul>
    //       </div>
    //     </nav>
    //   </div>
    // </div>

    <div className="container-fluid wrapper wrapper-inner">
      <div className="banner">
        <div className="banner-container">
          <div className="darkHeader">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-dark">
                <div className="menu-section">
                  <div className="logo">
                    <div className="logo-inner">
                      <a className="navbar-brand" href="index.html">
                        <img
                          src={Logo}
                          alt="resource-logo"
                          title="resource-logo"
                        />
                      </a>
                    </div>
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavbar"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse menu-items"
                    id="collapsibleNavbar"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item item-list">
                        <a classNameName="nav-link item-link" href="index.html">
                          HOME
                        </a>
                      </li>
                      <li className="nav-item item-list">
                        <a className="nav-link item-link" href="about-us.html">
                          ABOUT US
                        </a>
                      </li>
                      <li
                        className="nav-item item-list item-sublist"
                        id="service-nav"
                        data-attr="service-item-in"
                      >
                        <a className="nav-link item-link" href="#">
                          SERVICE<span className="arrowMenu-down"></span>
                        </a>
                        <div
                          className="item-in service-item-in"
                          style={{ display: "none" }}
                        >
                          <div className="item-in-left">
                            <ul className="tabs">
                              <li
                                data-attr="design-item-in"
                                className="sub-menu active"
                              >
                                <a id="tab1" href="web-design.html">
                                  WEB DESIGN
                                </a>
                              </li>
                              <li
                                data-attr="development-item-in"
                                className="sub-menu"
                              >
                                <a id="tab2" href="development.html">
                                  DEVELOPMENT
                                </a>
                              </li>
                              <li
                                data-attr="digital-item-in"
                                className="sub-menu"
                              >
                                <a id="tab3" href="digital-marketing.html">
                                  DIGITAL MARKETING
                                </a>
                              </li>
                              <li
                                data-attr="technical-item-in"
                                className="sub-menu"
                              >
                                <a id="tab4" href="technical.html">
                                  TECHNICAL
                                </a>
                              </li>
                              <li
                                data-attr="consultancy-item-in"
                                className="sub-menu"
                              >
                                <a id="tab5" href="consultancy.html">
                                  CONSULTING
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="item-in-right">
                            <div
                              className="item-inside design-item-in"
                              id="tab1C"
                              style={{ display: "block" }}
                            >
                              <h6>WEB DESIGN</h6>
                              <p>
                                ResourceOne is all about providing high-quality
                                web-based solutions and IT-enabled services at
                                affordable prices.
                              </p>
                              <a href="web-design.html">READ MORE</a>
                            </div>
                            <div
                              className="item-inside development-item-in"
                              id="tab2C"
                              style={{ display: "none" }}
                            >
                              <h6>DEVELOPMENT</h6>
                              <p>
                                Invest your business with strategic web
                                development services. ResourceOne is passionate
                                about building, engaging, aesthetic, and quality
                                websites that will make your marque stand out
                                from the rest.{" "}
                              </p>
                              <a href="development.html">READ MORE</a>
                            </div>
                            <div
                              className="item-inside digital-item-in"
                              id="tab3C"
                              style={{ display: "none" }}
                            >
                              <h6>DIGITAL MARKETING</h6>
                              <p>
                                Whether you want to upsurge conversions, traffic
                                to your website, or both, we can help you design
                                an internet marketing campaign that can help you
                                achieve your goals.
                              </p>
                              <a href="digital-marketing.html">READ MORE</a>
                            </div>
                            <div
                              className="item-inside technical-item-in"
                              id="tab4C"
                              style={{ display: "none" }}
                            >
                              <h6>TECHNICAL</h6>
                              <p>
                                Quick internet and technology grant the perfect
                                framework for electronic business procedures.{" "}
                              </p>
                              <a href="technical.html">READ MORE</a>
                            </div>
                            <div
                              className="item-inside consultancy-item-in"
                              id="tab5C"
                              style={{ display: "none" }}
                            >
                              <h6>CONSULTANCY</h6>
                              <p>
                                Braced by the vast experience, we are proficient
                                in formulating integrated solutions and practice
                                useful insights to enable clients to achieve
                                their business objectives.
                              </p>
                              <a href="consultancy.html">READ MORE</a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        className="nav-item item-list item-sublist"
                        id="industry-nav"
                        data-attr="EXPERTISE-item-in"
                      >
                        <a className="nav-link item-link" href="#">
                          EXPERTISE<span className="arrowMenu-down"></span>
                        </a>
                        <div
                          className="item-in EXPERTISE-item-in"
                          style={{ display: "none" }}
                        >
                          <div className="item-in-left">
                            <ul className="tabs">
                              <li
                                data-attr="health-item-in"
                                className="sub-menu"
                              >
                                <a id="tab6" href="#">
                                  FULL STACK DEVELOPERS{" "}
                                </a>
                              </li>
                              <li
                                data-attr="banking-item-in"
                                className="sub-menu"
                              >
                                <a id="tab7" href="Banking-Finance.html">
                                  MOBILE APP DEVELOPERS{" "}
                                </a>{" "}
                              </li>
                              <li
                                data-attr="retail-item-in"
                                className="sub-menu"
                              >
                                <a id="tab8" href="Retail-E-commerce.html">
                                  .NET DEVELOPERS
                                </a>{" "}
                              </li>
                              <li
                                data-attr="education-item-in"
                                className="sub-menu"
                              >
                                <a id="tab9" href="Education-Elearning.html">
                                  PHP FRAMEWORKS{" "}
                                </a>{" "}
                              </li>
                              <li data-attr="PHP-item-in" className="sub-menu">
                                <a id="tab10" href="Travel-Tourism.html">
                                  PYTHON DEVELOPERS{" "}
                                </a>{" "}
                              </li>
                              <li data-attr="CMS-item-in" className="sub-menu">
                                <a id="tab11" href="Travel-Tourism.html">
                                  CMS DEVELOPERS
                                </a>{" "}
                              </li>
                            </ul>
                          </div>
                          <div className="item-in-right">
                            <div
                              className="item-inside health-item-in"
                              id="tab6C"
                              style={{ display: "none" }}
                            >
                              <h6>FULL STACK DEVELOPERS</h6>
                              <ul className="menu-col">
                                <li>
                                  <a href="mean-stack.html">MEAN Stack</a>
                                </li>
                                <li>
                                  <a href="angularJS-developer.html">
                                    Angular JS
                                  </a>
                                </li>
                                <li>
                                  <a href="node-js-developer.html">Node JS</a>
                                </li>
                                <li>
                                  <a href="react-Js.html">React.JS</a>
                                </li>
                                <li>
                                  <a href="react-native.html">React Native</a>
                                </li>
                                <li>
                                  <a href="vue-js.html">Vue.JS</a>
                                </li>
                              </ul>
                            </div>
                            <div
                              className="item-inside banking-item-in"
                              id="tab7C"
                              style={{ display: "none" }}
                            >
                              <h6>MOBILE APP DEVELOPERS</h6>
                              <ul className="menu-col">
                                <li>
                                  <a href="android-app-developer.html">
                                    Android
                                  </a>
                                </li>
                                <li>
                                  <a href="ios-app-developer.html">iOS</a>
                                </li>
                                <li>
                                  <a href="hybrid-cross-platform.html">
                                    Hybrid-Cross Platform
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div
                              className="item-inside retail-item-in"
                              id="tab8C"
                              style={{ display: "none" }}
                            >
                              <h6>.NET DEVELOPERS</h6>

                              <ul className="menu-col">
                                <li>
                                  <a href="asp-dot-net.html">ASP.NET</a>
                                </li>
                                <li>
                                  <a href="csharp.html">C#</a>
                                </li>
                                <li>
                                  <a href="#">Xamarin</a>
                                </li>
                              </ul>
                            </div>
                            <div
                              className="item-inside education-item-in"
                              id="tab9C"
                              style={{ display: "none" }}
                            >
                              <h6>PHP FRAMEWORKS</h6>
                              <ul className="menu-col">
                                <li>
                                  <a href="php-developer.html">PHP</a>
                                </li>
                                <li>
                                  <a href="corePHP.html">Core PHP</a>
                                </li>
                                <li>
                                  <a href="cake-PHP.html">CakePHP</a>
                                </li>
                                <li>
                                  <a href="laravel-developer.html">Laravel</a>
                                </li>
                                <li>
                                  <a href="YII.html">YII</a>
                                </li>
                                <li>
                                  <a href="zend-framework.html">Zend</a>
                                </li>
                                <li>
                                  <a href="codeigniter.html">Codeigniter</a>
                                </li>
                                <li>
                                  <a href="ROR.html">ROR</a>
                                </li>
                              </ul>
                            </div>

                            <div
                              className="item-inside PHP-item-in"
                              id="tab10C"
                              style={{ display: "none" }}
                            >
                              <h6>PYTHON DEVELOPERS</h6>
                              <ul className="menu-col">
                                <li>
                                  <a href="Django.html">Django</a>
                                </li>
                                <li>
                                  <a href="Flask.html">Flask</a>
                                </li>
                                <li>
                                  <a href="Tornado.html">Tornado</a>
                                </li>
                                <li>
                                  <a href="web2pay.html">Web2pay</a>
                                </li>
                                <li>
                                  <a href="pyramid.html">Pyramid</a>
                                </li>
                              </ul>
                            </div>

                            <div
                              className="item-inside CMS-item-in"
                              id="tab11C"
                              style={{ display: "none" }}
                            >
                              <h6>CMS DEVELOPERS</h6>
                              <ul className="menu-col">
                                <li>
                                  <a href="drupal.html">Drupal</a>
                                </li>
                                <li>
                                  <a href="wordpress.html">Wordpress</a>
                                </li>
                                <li>
                                  <a href="joomla.html">Joomla</a>
                                </li>
                                <li>
                                  <a href="shar-point.html">SharePoint</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="nav-item item-list">
                        <a className="nav-link item-link" href="careers.html">
                          CAREERS
                        </a>
                      </li>
                      <li className="nav-item item-list">
                        <a className="nav-link item-link" href="#contact-US">
                          CONTACT US
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="container">
            <div className="banner-section">
              <div className="">
                <h1>
                  Top notch Technical Solutions <br />
                  for your company.
                </h1>
              </div>
              <div className="">
                <h1>
                  IT Consultancy that enhances <br />
                  customer experience <br />
                  and brand loyalty.{" "}
                </h1>
              </div>
              <div className="show-ban">
                <h1>
                  5% of customer retention <br />
                  can lead to an increase <br />
                  of 25% in profits.{" "}
                </h1>
              </div>
              <div className="">
                <h1>
                  Design, Explore, and <br /> Personalize a unique website{" "}
                  <br />
                  for your company.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col-md-4 our-services">
              <h1 className="mt40">SERVICES</h1>
              <p>
                Resource One is an industry leader in the field of Information
                Technology and continues to offer authentic solutions based on
                app development, IT Support, and digital marketing. We hold
                pride in creating top-notch solutions to enhance your company’s
                efficiency. We at Resource One work towards helping you achieve
                your goals and reaching the target audience.
              </p>
            </div>

            <a href="#" className="col-md-4 design">
              <div className="">
                <img
                  src="images/web-design.png"
                  alt="web-design"
                  title="web-design"
                />
                <h5> WEB DESIGN</h5>
                <p>
                  We have an artistic vision for designing eye-catching,
                  personalized, cost-effective, and flexible websites for our
                  clients. Our team of professionals is passionate about working
                  towards designing distinctive pages incorporated with easy
                  maintenance, SEO-rich content, higher conversion rates, and
                  low bounce rates.{" "}
                </p>
              </div>
            </a>

            <a href="#" className="col-md-4 development">
              <div className="">
                <img
                  src="images/web-development.png"
                  alt="web-development"
                  title="web-development"
                />
                <h5>DEVELOPMENT</h5>
                <p>
                  We offer a wide range of app development services which are
                  both secure and easy to use.We ensure protecting your data
                  from falling prey to malware and other cyber breaches. It
                  Consultancy. We also help our global clients achieve their
                  business goals by providing high quality technical resources.
                </p>
              </div>
            </a>
          </div>
          <div className="row">
            <a href="#" className="col-md-4 digital">
              <div className="">
                <img
                  src="images/digital-marketing.png"
                  alt="digital-marketing"
                  title="digital-marketing"
                />
                <h5>DIGITAL MARKETING</h5>
                <p>
                  We are the one-stop solution for availing the best tested
                  digital marketing strategies on various social media
                  platforms. We cover all the activities that go behind making a
                  successful online campaign
                </p>
              </div>
            </a>
            <a href="#" className="col-md-4 technical">
              <div className="">
                <img
                  src="images/technical.png"
                  alt="technical"
                  title="technical"
                />
                <h5>TECHNICAL</h5>
                <p>
                  {" "}
                  We provide reliable support for your company’s existing
                  developed applications. Right from resolving issues to
                  maintaining your applications will be taken care by our
                  experienced team .{" "}
                </p>
              </div>
            </a>
            <a href="#" className="col-md-4 consulatncy">
              <div className="">
                <img
                  src="images/Consulting.png"
                  alt="Consulting"
                  title="Consulting"
                />
                <h5>CONSULTING</h5>
                <p>
                  We are a pioneer in designing advanced, strategic, and
                  innovative strategies and investment plans. We are delighted
                  to test trending technologies, enhance the old one, keep your
                  company’s database protected and up to date, thereby creating
                  a firm foundation for your company.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="technologies">
        <div className="container">
          <h1>TECHNOLOGIES</h1>
          <div className="tech-info">
            <p>
              Finding reliable Business Solutions using trend setting
              technologies.
            </p>
          </div>
          <div className="row tech-inside">
            <img src="images/angular.jpg" alt="angular" title="angular" />
            <img src="images/react.jpg" alt="react" title="react" />
            <img src="images/node-js.jpg" alt="node-js" title="node-js" />
            <img src="images/java.jpg" alt="java" title="java" />
            <img src="images/megento.jpg" alt="megento" title="megento" />
          </div>
          <div className="row tech-inside">
            <img src="images/polymer.jpg" alt="polymer" title="polymer" />
            <img src="images/phython.jpg" alt="phython" title="phython" />
            <img src="images/django.jpg" alt="django" title="django" />
            <img src="images/jquery.jpg" alt="jquery" title="jquery" />
          </div>
          <div className="row tech-inside">
            <img
              src="images/html-css-mysql-php.jpg"
              alt="html-css-mysql-php"
              title="html-css-mysql-php"
            />
            <img
              src="images/microsoft-dotnet.jpg"
              alt="microsoft-dotnet"
              title="microsoft-dotnet"
            />
            <img
              src="images/ios-android.jpg"
              alt="ios-android"
              title="ios-android"
            />
          </div>
        </div>
      </div>
      <div className="innovation">
        <div className="container">
          <div id="display-innovation" className="row innovation-section">
            <div className="col-md-12 innovation-inside">
              <h1>
                Delivering Best <span>IT Solutions</span>
              </h1>

              <p id="1" style={{}}>
                Healthcare Helping health care industries scale up their game by
                providing technical solutions. We are Having experience in
                providing health care management systems across the globe.{" "}
              </p>
              <p id="2" style={{ display: "none" }}>
                We are enthusiastic about supporting technology-driven companies
                aiming to stay ahead in the Banking domain. Our experts offer
                unmatched guidance for discussing different solutions for global
                development and technical operations{" "}
              </p>
              <p id="3" style={{ display: "none" }}>
                Resource One is Having incredible experience in developing
                online stores and mobile friendly ecommerce apps . Ecommerce
                being the fastest growing industry , We have an experienced team
                to cater to your business goals.{" "}
              </p>
              <p id="4" style={{ display: "none" }}>
                Education and e-learning- At Resource One, we encourage
                innovation with technology and support teaching organizations to
                realize a competitive edge. Technology plays a vital role in
                revolutionizing educational practices.{" "}
              </p>
              <p id="5" style={{ display: "none" }}>
                {" "}
                Our company strives to improve performance, and employ
                developing technologies such as the Cloud, Social Computing,
                Mobility, and Big Data Analytics in travel and tourism.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="select-innovation" className="innovation innovation_imgs">
        <div className="container">
          <div className="row">
            <div data-id="1" className="innovation-inside active">
              <img
                src="images/healthcare.png"
                alt="healthcare"
                title="healthcare"
              />
              <h5>HEALTHCARE</h5>
            </div>
            <div data-id="2" className="innovation-inside">
              <img src="images/finance.png" alt="finance" title="finance" />
              <h5>BANKING &amp; FINANCE</h5>
            </div>
            <div data-id="3" className="innovation-inside">
              <img src="images/retail.png" alt="retail" title="retail" />
              <h5>RETAIL &amp; E-COMMERCE</h5>
            </div>
            <div data-id="4" className="innovation-inside">
              <img
                src="images/education.png"
                alt="education"
                title="education"
              />
              <h5>EDUCATION &amp; E-LEARNING</h5>
            </div>
            <div data-id="5" className="innovation-inside">
              <img src="images/travel.png" alt="travel" title="travel" />
              <h5>TRAVEL &amp; TOURISM</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="client-section">
        <div className="container">
          <div className="menu">
            <div className="client-heading">
              <h1>
                Clients <span>trust us</span>
              </h1>
            </div>
            <div className="client-info">
              <p>
                We have an extensive list of satisfied clients that we are proud
                to announce. With several years in this domain, our team
                promises to understand every client's needs. Some of the top
                names are MW Partners, Unravel Cloud, and Chemist Warehouse.{" "}
              </p>
            </div>
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#home">
                  <img
                    src="images/mwpartners.png"
                    alt="mwpartners"
                    title="mwpartners"
                  />
                  <img
                    src="images/client-arrow.png"
                    alt="client-arrow"
                    className="arrow"
                    title="client-arrow"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu1">
                  <img
                    src="images/unravel-cloud.png"
                    alt="unravel-cloud"
                    title="unravel-cloud"
                  />
                  <img
                    src="images/client-arrow.png"
                    alt="client-arrow"
                    className="arrow"
                    title="client-arrow"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu2">
                  <img
                    src="images/carznation.png"
                    alt="carznation"
                    title="carznation"
                  />
                  <img
                    src="images/client-arrow.png"
                    alt="client-arrow"
                    className="arrow"
                    title="client-arrow"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#menu3">
                  <img
                    src="images/my-cheist.png"
                    alt="my-cheist"
                    title="my-cheist"
                  />
                  <img
                    src="images/client-arrow.png"
                    alt="client-arrow"
                    className="arrow"
                    title="client-arrow"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div id="home" className="container tab-pane active">
            <br />
            <h3>MW PARTNER</h3>
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>
            <a href="#">Domain : www.mwpartners.net</a>
          </div>
          <div id="menu1" className="container tab-pane fade">
            <br />
            <h3>UNRAVEL CLOUD</h3>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <a href="#">Domain : www.unravelcloud.com</a>
          </div>
          <div id="menu2" className="container tab-pane fade">
            <br />
            <h3>CARZINATION</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <a href="#">Domain : www.carzination.com</a>
          </div>
          <div id="menu3" className="container tab-pane fade">
            <br />
            <h3>MY CHEMIST</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <a href="#">Domain : www.domain.com</a>
          </div>
        </div>
      </div>
      <div className="contact" id="contact-US">
        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 contact-form">
                <h5>SEND US A MESSAGE</h5>
                <p>
                  Please send us your details by filling out the form below, we
                  will quickly get back to you.
                </p>
                <form>
                  <input type="" className="form-control" placeholder="Name" />
                  <input
                    type=""
                    className="form-control"
                    placeholder="Email Address"
                  />
                  <input
                    type=""
                    className="form-control"
                    placeholder="Phone Number"
                  />
                  <input
                    type=""
                    className="form-control"
                    placeholder="Subject"
                  />
                  <textarea
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                  <input type="submit" value="SUBMIT" />
                </form>
              </div>
              <div className="contact-details">
                <div className="contact-inside">
                  <div className="location-img">
                    <img
                      src="images/address.png"
                      alt="address"
                      title="address"
                    />
                  </div>
                  <div className="location-img">
                    <p>
                      Plot No.26&amp;27, Door No. 7-66/2/26 &amp; 27, 4th Floor,
                    </p>
                    <p>Prashanth Hills, Khajaguda Road, Hyderabad - 500008</p>
                  </div>
                </div>
                <div className="contact-inside">
                  <div className="info-contact">
                    <img
                      src="images/contact.png"
                      alt="contact"
                      title="contact"
                    />
                    <span>+91 9515878547</span>
                  </div>
                  <div className="info-contact">
                    <img src="images/email.png" alt="email" title="email" />
                    <span>info@resourceone.in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <div className="container">
            <div className="row footer-in">
              <div className="col-md-6">
                <div className="row copyright">
                  <p>
                    Copyrights © 2019 All Rights Reserved by Resource IT
                    Solutions
                  </p>
                </div>
              </div>
              <div className="col-md-6 social-icons">
                <a href="#">
                  <img
                    src="images/facebook.png"
                    alt="facebook"
                    title="facebook"
                  />
                </a>
                <a href="#">
                  <img src="images/twitter.png" alt="twitter" title="twitter" />
                </a>
                <a href="#">
                  <img src="images/linkdin.png" alt="linkdin" title="linkdin" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
