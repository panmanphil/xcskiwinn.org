# xcskiwinn.org

This site was a 'as quick as possible' conversion of a Drupal 7 site with a custom theme converted so it could run as a static web site from Amazon S3. At the time the hosting provider for the Drupal site, Arvixe, had been sold, the data center moved, and reliability pretty much went completely out the door. So for increased reliability and absolutely botton dollar hosting costs via AWS S3, the site was migrated. No effort was made to improve the generated layout from the drupal theme, views, fields and site generated markup. 

Basically, I dumped the handful of pages of the original site by capturing them in Chrome with Save as Web Page, and then created a static site partially constructed from a template filled in by gulp inject tasks. 

This site changes rarely so there are no pressing needs. I am interested in completing the template so that content and layout are better separated, perhaps with the content done in markdown. There are some other serverless frameworks getting going now though, so I'll probably just wait until these have matured a bit more. If I do add another page, I'll probably updated the template a bit more to inject the header and footer areas. 
