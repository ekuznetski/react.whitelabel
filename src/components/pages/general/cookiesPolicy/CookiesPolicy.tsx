import { BackButton, Col, Container, Row, Table } from '@components/shared';
import { SimplePageTopSection } from '@components/sections';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cookiesTable } from './';
import './CookiesPolicy.scss';

export function CookiesPolicy() {
  const { t } = useTranslation();

  return (
    <div className="cookies-policy-wrapper">
      <SimplePageTopSection title={t('Cookies Policy')} />
      <section>
        <Container>
          <Row>
            <Col>
              <b>What are cookies?</b>
              <br />
              <br />
              Cookies are small pieces of text stored on your computer when you visit a website. They are not programs
              and cannot be executed as code or deliver viruses – instead cookies act more like a passport, which the
              site checks and updates whenever you visit.
              <br />
              <br />
              <b>Almost every site on the internet uses cookies and their functions include:</b>
              <br />
              <br />
              <ul>
                <li>verifying your identity for security purposes</li>
                <li>determining the type of browser and settings you are using</li>
                <li>allowing site owners and third-party advertisers to tailor content to your preferences</li>
              </ul>
              <br />
              <b>Our policy</b>
              <br />
              <br />
              UINVEX respects your privacy, and we are committed to providing you with the information and tools you
              need to manage your cookies.
              <br />
              <br />
              <b>There are two types of cookie on this site:</b>
              <br />
              <br />
              <ul>
                <li>
                  Essential cookies are necessary for the vital functions of our site and trading platform. If these are
                  disabled, you won’t be able to access the platform or other important parts of the site.
                </li>
                <li>
                  Behavioural/analytical cookies help us understand the way visitors and clients use our website, so we
                  can provide a better service. We use the data from behavioural and analytical cookies to improve our
                  site and provide individually tailored content. These cookies make it easier for you to find the
                  information you need and allow us to adapt our site to suit your preferences. Some of the systems we
                  use to track web traffic and site usage are provided by third-party companies such as Google.
                </li>
              </ul>
              <br />
              On your desktop, laptop or tablet computer, you can choose how to accept cookies by changing the settings
              in your browser. For information on how to manage cookies on your mobile phone, you will need to refer to
              your handset manual.
              <br />
              <br />
              We are also currently developing a built-in solution for our site, giving you more control over the
              cookies you accept.
              <br />
              <br />
              For more information, you may wish to visit{' '}
              <a href="https://www.aboutcookies.org" target="_blank">
                www.aboutcookies.org
              </a>
              , which contains instructions on how to amend your cookie settings for a wide variety of browsers. You
              will also find details on how to delete existing cookies from your computer, as well as more general
              information about cookies.
              <br />
              <br />
              If you have any specific questions or concerns about cookies, please contact{' '}
              <a href="https://mailto:info@uinvex.com">info@uinvex.com</a>
              <br />
              <br />
              <b>UINVEX</b> is committed to keeping your personal information safe. For more information on how{' '}
              <b>UINVEX</b> handles your data, see our Privacy Policy.
              <br />
              <br />
              <b>Types of cookies on UINVEX Website</b>
              <br />
              <br />
              <b>Session</b> cookies save website ’session’ credentials for visitors both logged in and not logged in.
              Once the browser is closed, the cookie is deactivated – and the session closed.
              <br />
              <br />
              <b>Analytical</b> cookies collect visitor information, such as the number of visits, how our website was
              found, where the visit came from, if via a marketing campaign etc. This information is extremely important
              to the business and helps us improve our website and further enhance our visitor experience.
              <br />
              <br />
              <b>Functional</b> cookies are specifically about visitor experience on the website. For example they
              ‘remember’ the open/closed status of pop-up messages, what time zone or view state was set for the
              Economic Calendar, enabling access to information stored when registered with UINVEX and so on. Without
              these functional cookies, no settings information can be saved.
              <br />
              <br />
              <b>Third Party</b> cookies are set by other websites who place cookies on the user’s computer. The "3rd
              party" cookies are placed when you are logged into their service, and UINVEX does not control the
              dissemination of these cookies. These cookies are session, analytical, and functional; they determine if
              the user is logged into a social network already, control bookmarking or sharing UINVEX content, and
              determine if you have Flash player installed when viewing our videos. UINVEX uses Adobe Flash Player to
              display this content. Flash cookies (Local Shared Objects) are used to verify if the user’s browser
              supports Flash. If you wish to disable Flash cookies, please visit
              www.adobe.com/products/flashplayer/security. Other third parties should be contacted directly to view
              their cookie privacy information.
              <br />
              <br />
              <b>Cookies Table</b>
              <br />
              <br />
              <Table {...cookiesTable} />
              <br />
              <br />
              <b>How do I change my cookie settings?</b>
              <br />
              <br />
              Most web browsers allow some control of most cookies through the browser settings. To find out more about
              cookies, including how to see what cookies have been set, visit{' '}
              <a href="https://www.aboutcookies.org" target="_blank">
                www.aboutcookies.org
              </a>{' '}
              or{' '}
              <a href="https://www.allaboutcookies.org" target="_blank">
                www.allaboutcookies.org
              </a>
              .
              <br />
              <br />
              Find out how to manage cookies on popular browsers:
              <ul>
                <li>
                  <a href="#" target="_blank">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    Microsoft Edge
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    Microsoft Internet Explorer
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    Opera
                  </a>
                </li>
                <li>
                  <a href="#" target="_blank">
                    Apple Safari
                  </a>
                </li>
              </ul>
              <br />
              To find information relating to other browsers, visit the browser developer's website.
              <br />
              <br />
              To opt out of being tracked by Google Analytic across all websites, visit{' '}
              <a href="http://tools.google.com/dlpage/gaoptout" target="_blank">
                http://tools.google.com/dlpage/gaoptout
              </a>
              <br />
              <br />
              We are planning to enhance our cookie tool to allow users to more easily change their cookie settings
              after their initial choice.
              <br />
              <br />
              If you are a UINVEX client there are certain behavioural/analytical cookies that you will need to accept
              in order to use our trading platform. If you’d ike to know more about good practice in online advertising,
              visit the Internet Advertising Bureau at{' '}
              <a href="https://iabuk.net" target="_blank">
                iabuk.net
              </a>
            </Col>
          </Row>
          <Row className="back-button-wrapper">
            <Col>
              <BackButton />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
