import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function TermsScreen(props) {
  const [customersTerms, setCustomersTerms] = useState(false);
  const [buyersTerms, setBuyersTerms] = useState(false);
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          title={'Terms and Conditions'}
          arrowNavigation={() => props.navigation.goBack()}
          movePreviousArrow={true}
        />
        <SafeAreaView />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 35,
            marginBottom: 20,
            borderBottomWidth: 2,
            borderColor: '#00000010',
          }}>
          <Text
            onPress={() => {
              setCustomersTerms(true);
              setBuyersTerms(false);
            }}
            style={{
              fontSize: 20,
              borderBottomWidth: !buyersTerms ? 1 : 0,
              borderColor: customersTerms ? COLORS.main : '#000',
              width: Platform.OS === 'ios' ? 130 : 140,
              color: customersTerms ? COLORS.main : '#000',
            }}>
            For Customers
          </Text>

          <View
            style={{
              borderLeftWidth: 2,
              width: 2,
              height: 20,
              borderBottomWidth: 2,
              borderColor: '#00000010',
            }}
          />
          <Text
            onPress={() => {
              setCustomersTerms(false);
              setBuyersTerms(true);
            }}
            style={{
              fontSize: 20,
              borderBottomWidth: !customersTerms ? 1 : 0,
              borderColor: buyersTerms ? COLORS.main : '#000',
              width: Platform.OS === 'ios' ? 130 : 140,
              color: buyersTerms ? COLORS.main : '#000',
            }}>
            For Sellers
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp2(8),
            paddingTop: 10,
            paddingBottom: hp2(2),
          }}>
          {customersTerms && !buyersTerms ? (
            <Text style={{color: 'black', textAlign: 'justify'}}>
              Welcome to La Maison App, a dedicated platform for fashion
              enthusiasts seeking to purchase high-quality, authentic fashion
              items from trusted sellers worldwide. These Customer Terms and
              Conditions govern the Customer’s (your, you) access to and use of
              our services at http://la-maison-app.com/ (our, we).
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}1. Acceptance of Terms
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                1.1. By accessing or using our marketplace, you confirm your
                understanding and acceptance of these Terms and Conditions. Your
                agreement to these terms forms a binding legal contract between
                you and La Maison App.
                {'\n'}
                1.2. You must agree to all the terms herein to use our services.
                If you do not accept these terms, you are required to cease
                using our marketplace immediately.
                {'\n'}
                1.3. Your continued use of our services signifies your ongoing
                consent to be bound by these Terms, including any amendments
                made from time to time. It is essential that you review these
                Terms periodically to understand the conditions that apply.
                {'\n'}
                1.4. We reserve the right to modify these Terms at any time. You
                are responsible for regularly reviewing these Terms to ensure
                that you are updated on any changes. Your continued use of the
                marketplace after any such changes indicates your acceptance of
                the new Terms.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}2. Account Registration and Use
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}2.1. To participate in transactions within our
                marketplace, you are required to register an account.
                {'\n'}
                2.2. Users may opt to make purchases using a guest account.
                However, please be advised that transaction details and user
                information will not be stored within the application when using
                this method. Guest account users will be restricted to viewing
                content only and will not have the ability to interact with
                content beyond this functionality.
                {'\n'}
                2.3. During the registration process, you are obligated to
                provide truthful, accurate, and complete information.
                {'\n'}
                2.4. You are solely responsible for maintaining the
                confidentiality and security of your account credentials,
                including your username and password.
                {'\n'}
                2.5. You agree that all activities occurring under your account
                are your responsibility. This includes any transactions,
                communications, or interactions conducted using your account
                credentials.
                {'\n'}
                2.6. You must notify us immediately of any unauthorised access
                to or use of your account, or any other breach of security.
                {'\n'}
                2.7. We shall not be liable for any loss or damage arising from
                your failure to comply with the security obligations outlined in
                these Terms.
                {'\n'}
                2.8. You may not transfer your account to another party without
                our explicit consent.
                {'\n'}
                2.9. We reserve the right to suspend or terminate your account
                at our discretion, particularly if we suspect unauthorised or
                fraudulent activity.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}3. Privacy Policy
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}3.1. Our Privacy Policy details the types of personal
                information we collect from users, how we use it, and the steps
                we take to protect it. Please refer to our Privacy Policy on our
                website to understand how we handle your personal data.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}4. Purchasing Terms and Conditions
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}4.1. When making a purchase on La Maison App, you agree to
                the following terms:
                {'\n'}
                4.1.1. You must agree to the terms as specified in the seller’s
                individual product listing.
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  4.1.2. Product Review
                  {'\n'}
                  4.1.2.1. Carefully read and understand the full product
                  description.
                  {'\n'}
                  4.1.2.2. Confirm that the product dimensions or size meet your
                  requirements.
                  {'\n'}
                  4.1.2.3. Ensure that the colour of the product matches what
                  you need.
                  {'\n'}
                  4.1.2.4. Material: Check what materials are used and if they
                  meet your expectations.
                  {'\n'}
                  4.1.2.5. Design: Review the design details to verify that they
                  align with your preferences.
                  {'\n'}
                  4.1.2.6. Images: Examine all provided images to ensure the
                  product appears as expected.
                </Text>
                4.1.3. Additional Terms:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  4.1.3.1. Review any additional seller-specific terms which may
                  include shipping policies, return and exchange procedures, and
                  details about warranties or guarantees.
                  {'\n'}
                  4.1.3.2. Acknowledgment:
                  {'\n'}
                  <Text style={{marginLeft: 30}}>
                    4.1.3.2.1. By completing your purchase, you acknowledge that
                    you have reviewed and understand all the aforementioned
                    aspects of the product and agree to proceed with the
                    transaction based on this informed understanding.
                  </Text>
                </Text>
                4.1.4. We are not responsible for discrepancies between your
                expectations and the product if all terms and conditions,
                including thorough review of the provided information, are not
                adhered to.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}5. Payment
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}5.1. When making a purchase on La Maison App, you are
                required to adhere to the following detailed payment terms:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  5.1.1. Approved Payment Methods
                  {'\n'}
                  5.1.1.1. You must use only the payment methods that are
                  approved and listed by La Maison App. These methods are
                  selected to ensure secure and reliable transactions.
                  {'\n'}
                  5.1.1.2. The availability of specific payment methods may vary
                  based on the buyer’s location and the seller’s preferences.
                </Text>
                5.2. Complete Payment
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  5.2.1. You agree to pay the full listed price for the items as
                  shown in the product listing.
                  {'\n'}
                  5.2.2. All prices are inclusive of applicable taxes unless
                  stated otherwise in the product listing.
                  {'\n'}
                  5.2.3. Additional charges, such as shipping or handling fees,
                  will be clearly disclosed before the completion of the
                  purchase.
                </Text>
                5.3. Transaction Security
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  5.3.1. Each transaction must comply with the security measures
                  in place to protect both parties involved in the purchase.
                  {'\n'}
                  5.3.2. La Maison App implements robust security protocols to
                  safeguard your financial information during transactions.
                </Text>
                5.4. Payment Timing
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  5.4.1. Payment must be made promptly at the time of purchase.
                  Failure to do so may result in cancellation of the order or
                  delays in shipment.
                </Text>
                5.5. Non-Refundable Fees
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  5.5.1. Be aware that certain fees, such as processing or
                  transaction fees, may be non-refundable, depending on the
                  policies of the payment providers.
                </Text>
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}6. Shipping and Handling
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}6.1. Products purchased through our marketplace will be
                shipped in accordance with the shipping policy detailed in each
                seller's listing. It is crucial for you to review these policies
                before making a purchase to understand the specific terms,
                including shipping methods and costs.
                {'\n'}
                6.2. The delivery times for orders can vary significantly
                depending on your geographic location and the origin of the
                shipment. Please note that delivery estimates are just
                that—estimates, and actual delivery times may differ based on
                several factors including logistical challenges, weather
                conditions, and customs delays.
                {'\n'}
                6.3. Be aware that international shipments may require more time
                due to the need to clear customs and other cross-border
                activities. We encourage you to consider these factors when
                placing an order, especially if the items are needed by a
                specific date.
                {'\n'}
                6.4. Once your order is dispatched, you will typically receive a
                tracking number that allows you to follow the progress of your
                shipment. We recommend keeping track of your delivery to address
                any issues promptly, should they arise.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}7. Returns, Refunds, and Exchanges
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}7.1. The ability to return items, request refunds, or
                process exchanges is governed by the return policy of the
                individual seller. These policies are detailed and linked within
                each product listing. It is important for you to familiarise
                yourself with these policies prior to making a purchase to
                understand your rights and obligations under each seller's
                terms.
                {'\n'}
                7.2. If you need to return a product due to defects, incorrect
                deliveries, or other issues, it is essential to adhere to the
                guidelines outlined in the seller’s return policy. This includes
                respecting any specified time frames for returns, the condition
                in which items need to be returned, and the documentation
                required.
                {'\n'}
                7.3. In cases where refunds or exchanges are warranted, the
                process will be conducted according to the seller’s stipulated
                procedures. This typically involves providing proof of purchase,
                detailing the reason for the return, and meeting any conditions
                the seller has set for such processes.
                {'\n'}
                7.4. To ensure a smooth refund process, all purchases must be
                conducted through our application. This is necessary to verify
                transactions accurately. We cannot guarantee verification of
                transactions or process refunds for purchases made outside of
                our application.
                {'\n'}
                7.5. For any questions or clarifications regarding returns,
                refunds, or exchanges, please directly contact the seller
                through the provided communication channels in their listings.
                This direct communication ensures any issues are addressed
                promptly and according to the specific policies of each seller.
                {'\n'}
                7.6. Should disputes arise regarding returns, refunds, or
                exchanges, we encourage you to contact our customer service
                team. We are here to assist you in facilitating resolutions
                between you and the seller, ensuring a fair outcome for all
                parties involved.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}8. Accessibility
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}8.1. We are committed to ensuring that our application is
                accessible to all users. We adhere to all relevant accessibility
                standards and regulations as enforced by UK authorities,
                including but not limited to the Equality Act 2010 and the UK
                Public Sector Bodies (Websites and Mobile Applications) (No. 2)
                Accessibility Regulations 2018. We continuously work to improve
                accessibility features and welcome feedback to enhance user
                experience.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}9. Liability Limitations
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}9.1. To the maximum extent permitted by law, La Maison App
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss
                of data, use, goodwill, or other intangible losses, resulting
                from (a) your access to, use of, or inability to access or use
                the services; (b) any conduct or content of any third party on
                the services; (c) any content obtained from the services; and
                (d) unauthorised access, use, or alteration of your
                transmissions or content, even if we have been informed of the
                possibility of such damages.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}10. Indemnification
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}10.1. You agree to indemnify, defend, and hold harmless La
                Maison App, its principals, officers, directors,
                representatives, employees, contractors, licensors, licensees,
                suppliers, and agents, from and against any claims, losses,
                damages, obligations, costs, actions, or demands.
                {'\n'}
                10.2. These include but are not limited to: legal and accounting
                fees resulting from your use of our services; your breach of any
                of these Terms; anything you post on or upload to our service;
                and any activity related to your account. This includes any
                negligent or illegal conduct by you, any person or entity
                accessing the service using your account whether such access is
                obtained via fraudulent or illegal means.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}11. Customer Conduct
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}11.1. Prohibition of Misuse: You agree to use our
                marketplace responsibly. Misuse, including intentionally placing
                false orders or engaging in fraudulent transactions, is strictly
                prohibited. Such actions undermine the integrity of our platform
                and can lead to account termination and legal action.
                {'\n'}
                11.2. Respectful Interaction: You are expected to conduct
                yourself in a manner that is respectful to both sellers and
                fellow customers. This includes adhering to all community
                guidelines and avoiding any behaviour that could be considered
                harassing, abusive, or discriminatory.
                {'\n'}
                11.3. Compliance with Community Guidelines: Our marketplace
                thrives on mutual respect and cooperation. You must follow all
                community guidelines, which promote a positive and productive
                environment for all users. These guidelines are designed to
                foster constructive interactions and ensure a safe, welcoming
                space for everyone.
                {'\n'}
                11.4. Reporting Inappropriate Behaviour: If you encounter any
                conduct that violates our community standards or terms of
                service, you are encouraged to report it to our customer support
                team. We are committed to maintaining a respectful and secure
                marketplace and will take appropriate action against any
                violations.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}12. Termination and Suspension of Accounts
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}12.1. To ensure a safe and trustworthy environment for all
                users of La Maison App, we reserve the right to suspend or
                terminate an account under certain circumstances. Below is a
                detailed outline of the procedures we follow in the event of a
                suspension or termination, as well as the appeal process
                available to affected users:
                {'\n'}
                12.2. Reasons for Suspension or Termination
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  12.2.1. Violation of Terms and Conditions: Any breach of our
                  Customer Terms and Conditions may result in temporary
                  suspension or permanent termination of your account.
                  {'\n'}
                  12.2.2. Fraudulent Activities: Engaging in fraudulent
                  activities or any form of manipulation within our marketplace,
                  including fraudulent transactions or false claims.
                  {'\n'}
                  12.2.3. Illegal Activities: Use of our services for any
                  illegal purposes or to conduct any illegal activity.
                  {'\n'}
                  12.2.4. Harmful Conduct: Any behaviour that harms other users,
                  disrupts our operations, or impairs the functionality and
                  integrity of our platform.
                </Text>
                12.3. Procedure for Suspension or Termination
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  12.3.1. Before suspending or terminating an account, we will
                  notify the user via email, detailing the reason for such
                  action. This communication will provide specific examples of
                  the violation or behaviour that led to the decision.
                  {'\n'}
                  12.3.2. Users will have the opportunity to respond to the
                  suspension or termination notification within a specified
                  period (typically 7 days), providing any explanations,
                  clarifications, or evidence that may influence the final
                  decision.
                  {'\n'}
                  12.3.3. Based on the user’s response and our further
                  investigation, we will decide whether to lift the suspension,
                  continue it, or move forward with termination.
                </Text>
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}13. Governing Law and Dispute Resolution
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}13.1. These terms shall be governed by and construed in
                accordance with the laws of the United Kingdom. Any disputes
                arising under or in connection with these terms shall be subject
                to the exclusive jurisdiction of the courts of the United
                Kingdom.
                {'\n'}
                13.2. In case of disputes with a seller, please try to resolve
                the issue amicably by contacting the seller directly through the
                available communication channels.
                {'\n'}
                13.3. If the issue cannot be resolved directly with the seller,
                you may contact our customer service team for mediation.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}14. Changes to the Terms
              </Text>
              <Text style={{marginLeft: 10}}>
                {'\n'}14.1. We reserve the right to modify these terms at any
                time. Such modifications will be effective immediately upon
                posting on the marketplace. Your continued use of our services
                after any modification confirms your acceptance of the new
                terms.
              </Text>
              {'\n'}
              {'\n'}
              For any inquiries or questions regarding these Terms and
              Conditions, please contact our customer support at
              lamaisonapptld@gmail.com.
            </Text>
          ) : (
            <Text style={{color: 'black', textAlign: 'justify'}}>
              Welcome to La Maison App, a premier platform for fashion sellers
              worldwide to connect with a dedicated audience of fashion
              enthusiasts. These Seller Terms and Conditions govern your access
              to and use of our services at http://la-maison-app.com/ (we, our,
              us).
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}1. Acceptance of Terms
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                1.1. By using our platform, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and Conditions.
                Your consent to these terms forms a binding legal contract under
                which you agree to comply with all applicable laws and
                regulations, ensuring that your use of our services adheres
                strictly to these stipulations.
                {'\n'}
                1.2. If you do not fully accept these terms in their entirety,
                you are not authorised to access or use our marketplace. You
                must discontinue use of our platform immediately.
                {'\n'}
                1.3. Your continued access to or use of our services after any
                modifications to these terms indicates your acceptance of the
                modified terms and your agreement to abide by them.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}2. Amendments to Terms
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                2.1. We reserve the exclusive right to amend, change, or update
                these Terms and Conditions at any time without prior notice to
                you. Such amendments may reflect changes in legal or regulatory
                requirements, adjustments in the features or functionality of
                our services, or updates needed to address other business
                considerations.
                {'\n'}
                2.2. It is your responsibility to regularly review these Terms
                to ensure you are up-to-date with any changes. We recommend
                checking these terms frequently to understand the most current
                obligations and privileges.
                {'\n'}
                2.3. Should you decide at any point that you no longer agree to
                these Terms, or if you fail to comply with them, you must
                immediately cease all access to and use of La Maison App.
                {'\n'}
                2.4. Legal Consequences: Failure to comply with these Terms and
                Conditions can result in legal actions against you, suspension
                or termination of your account, and forfeiture of any content or
                fees associated with your use of our services.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}3. Accessibility
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                3.1. We are committed to ensuring that our application is
                accessible to all users. We adhere to all relevant accessibility
                standards and regulations as enforced by UK authorities,
                including but not limited to the Equality Act 2010 and the UK
                Public Sector Bodies (Websites and Mobile Applications) (No. 2)
                Accessibility Regulations 2018. We continuously work to improve
                accessibility features and welcome feedback to enhance user
                experience.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}4. Account Registration and Use
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                4.1. To engage in selling items on La Maison App, it is
                mandatory to establish a seller account. During the registration
                process, you must provide information that is truthful,
                accurate, and complete in all respects. This includes your
                personal details, contact information, and any other data
                required by La Maison App to facilitate transactions.
                {'\n'}
                4.2. You are solely responsible for maintaining the
                confidentiality of your account credentials, including your
                username and password. It is crucial that you take all necessary
                precautions to ensure the security of your account information.
                {'\n'}
                4.3. You agree to accept responsibility for all activities that
                occur under your account. This encompasses transactions
                initiated, communications made, and agreements entered into
                through your account.
                {'\n'}
                4.4. In the event of any unauthorised access to, or use of, your
                account, it is imperative that you notify us immediately. Prompt
                reporting helps mitigate potential misuse and limits possible
                damages.
                {'\n'}
                4.5. Upon receiving notification of any breach, we will take
                appropriate measures to secure your account and investigate the
                incident. We are committed to assisting you in regaining secure
                control of your account and mitigating any adverse effects.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}5. Intellectual Property Rights
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                5.1. As a seller, you assert that you hold all necessary rights
                to the content and products you list on La Maison App. By
                listing a product, you grant La Maison App a non-exclusive,
                worldwide, royalty-free licence to use, display, reproduce,
                adapt, modify, and distribute any content provided by you in
                connection with the marketplace, including but not limited to
                product images and descriptions.
                {'\n'}
                5.2. We respect intellectual property rights and expect our
                sellers to do the same. Sellers are prohibited from listing
                counterfeit items or engaging in copyright infringement.
                Violations may result in account suspension or termination.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}6. Data Protection and Privacy
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                6.1. We commit to protecting the privacy and security of the
                data provided by our users. All personal information is
                processed in accordance with our Privacy Policy, which outlines
                our practices regarding the collection, use, and protection of
                personal data. Our policy complies with all applicable laws and
                regulations, including GDPR where applicable.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}7. Product Listings
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                7.1. As a seller on La Maison App, you are required to ensure
                that all product listings are not only comprehensive but also
                accurate and truthful. This commitment to integrity in listing
                details is crucial for maintaining trust within our marketplace
                and ensuring customer satisfaction.
                {'\n'}
                7.2. To ensure transparency and provide potential buyers with
                the necessary information to make informed decisions, each
                product listing on La Maison App must include the following
                elements:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  7.2.1. Detailed Product Descriptions: Provide a thorough
                  description of the item including all relevant details such as
                  features, benefits, and unique selling points. This
                  description should give buyers a clear understanding of what
                  the product offers and why it meets their needs.
                  {'\n'}
                  7.2.2. Accurate Dimensions or Sizes: Clearly state the
                  dimensions or sizes of the product to help customers assess
                  whether the item meets their specific requirements. This is
                  especially important for apparel, accessories, and other
                  size-dependent items. As a seller on our platform, you are
                  required to list all clothing and footwear products in UK
                  standard sizes. Clothing should be sized as Small (S), Medium
                  (M), Large (L), etc., and footwear should be listed
                  numerically (e.g., 5, 6, 7).
                  {'\n'}
                  7.2.3. Clear and Truthful Images: Upload high-resolution
                  images that accurately represent the product. Images should be
                  clear and free from any manipulation that could mislead
                  customers about the product's appearance, colour, or quality.
                  {'\n'}
                  7.2.4. Material and Design Specifications: Detail the
                  materials used in the product’s construction and any design
                  specifics that are pertinent to the item's functionality and
                  appeal. This includes textures, types of materials,
                  craftsmanship, and any other relevant design elements.
                </Text>
                7.3. Additional Terms: Include any additional seller-specific
                terms such as:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  7.3.1. Shipping Policies: Outline your shipping methods,
                  costs, handling times, and any geographical shipping
                  restrictions.
                  {'\n'}
                  7.3.2. Return and Exchange Procedures: Clearly define your
                  return and exchange policies, specifying conditions under
                  which returns or exchanges are accepted, time frames for
                  initiating returns, and how refunds are processed.
                  {'\n'}
                  7.3.3. Warranty Details: If applicable, provide details of any
                  warranties that accompany the product, including the duration
                  of the warranty, what it covers, and how customers can make a
                  claim.
                </Text>
                7.4. To maintain a high standard of service and ensure a
                reliable marketplace, sellers must meet minimum performance
                standards regarding order fulfilment. These standards include
                shipping orders within the timeline specified in the listing and
                maintaining a low rate of customer complaints and returns.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}8. Listing Standards and Compliance
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                8.1. All listings must comply with the standards and policies
                set forth by La Maison App, ensuring that they meet legal and
                ethical requirements.
                {'\n'}
                8.2. Keep your listings updated to reflect any changes in
                product availability, specifications, or terms. Regular updates
                help avoid customer confusion and disputes.
                {'\n'}
                8.3. By adhering to these detailed guidelines for product
                listings, you contribute to a trustworthy marketplace
                environment and enhance the shopping experience for all users of
                La Maison App. This commitment to quality and transparency in
                listings is essential for building and maintaining customer
                trust and satisfaction.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}9. Lawful and Ethical Conduct
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                9.1. As a valued seller on La Maison App, you are obligated to
                conduct all transactions in a lawful manner. This commitment is
                essential to maintaining the integrity and reliability of our
                marketplace. You must ensure that all sales are legitimate,
                transparent, and free from any form of fraud or deception.
                {'\n'}
                9.2. Sellers must avoid conflicts of interest and disclose
                potential conflicts to La Maison App. This policy ensures all
                marketplace transactions are conducted within ethical and legal
                boundaries.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}10. Adherence to Transaction Terms
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                10.1. You are required to adhere strictly to the terms and
                conditions agreed upon for each transaction. This includes the
                price, product details, and any other commitments made in the
                product listing.
                {'\n'}
                10.2. You are responsible for the fulfilment of all orders in a
                timely and professional manner. Ensure that products are
                dispatched as per the timelines outlined in your listing and
                that they match the quality and specifications advertised.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}11. Professional Conduct
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                11.1. Maintain clear and professional communication with buyers
                at all stages of the transaction. Promptly address any questions
                or concerns they may have.
                {'\n'}
                11.2. Handle any disputes with buyers fairly and courteously.
                Strive to resolve issues in a manner that upholds the reputation
                of your business and La Maison App.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}12. Shipping and Handling
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                12.1. You must ship items in accordance with the shipping policy
                clearly specified in your listing. This includes adhering to
                your stated shipping methods, costs, and any geographic
                restrictions.
                {'\n'}
                12.2. It is your responsibility to ensure that items are
                delivered within the estimated delivery times provided to
                buyers. Delays should be communicated promptly to the buyer,
                explaining the reasons and expected delivery timeline.
                {'\n'}
                12.3. Tracking and Updates
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  12.3.1. Upon dispatch, provide the buyer with tracking
                  information that allows them to follow the progress of their
                  shipment. This transparency is crucial for building trust and
                  ensuring customer satisfaction.
                  {'\n'}
                  12.3.2. Ensure that you receive confirmation of delivery, and
                  be prepared to act on any delivery issues that the buyer
                  reports.
                </Text>
                12.4. Handling Expectations
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  12.4.1. Items must be packaged securely and appropriately to
                  prevent damage during transit. Use materials that protect the
                  product while also considering sustainability where possible.
                  {'\n'}
                  12.4.2. Be responsive to any shipping-related queries from
                  buyers. Provide clear information and assistance throughout
                  the delivery process.
                </Text>
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}13. Fair and Responsive Handling
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                13.1. Ensure that all returns and exchanges are processed
                promptly to maintain trust and satisfaction with your buyers.
                {'\n'}
                13.2. Handle all requests fairly, respecting the buyer's rights
                under your policies and any consumer protection laws that may
                apply.
                {'\n'}
                13.3. Maintain open and clear communication with buyers
                throughout the process of returns, refunds, or exchanges. Inform
                them of any issues or delays as soon as possible.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}14. Fees and Payments
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                14.1. Transaction Fees
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  14.1.1. La Maison App charges a fee for transactions processed
                  through our platform. This fee facilitates the maintenance and
                  improvement of marketplace services.
                  {'\n'}
                  14.1.1.1. By listing products on La Maison App, you agree to
                  these transaction fees. You acknowledge that the amount of
                  these fees is disclosed in your seller account details and may
                  be subject to changes.
                  {'\n'}
                  14.1.1.2. Any changes to fee structures will be communicated
                  to you with prior notice, allowing you to make informed
                  decisions about your continued use of our platform.
                </Text>
                14.2. Payment Compliance
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  14.2.1. All payments from buyers must be processed exclusively
                  through the payment methods approved and provided by La Maison
                  App. This ensures that transactions are secure and that
                  financial data is protected.
                  {'\n'}
                  14.2.2. Ensure that you comply with the payment terms set by
                  La Maison App, which facilitate timely and efficient
                  processing of transactions.
                  {'\n'}
                  14.2.3. In case of payment disputes, engage cooperatively with
                  La Maison App and the buyer to resolve the issues promptly and
                  fairly.
                </Text>
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}15. Responsibilities and Liabilities
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                15.1. You agree to indemnify and hold La Maison App and its
                affiliates harmless from all liabilities, losses, damages, and
                costs (including reasonable attorneys' fees) that they may incur
                due to:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  15.1.1. Claims made against them arising from your use of the
                  marketplace;
                  {'\n'}
                  15.1.2. Your actions within the marketplace including the
                  products or services you list;
                  {'\n'}
                  15.1.3. Violations of these Terms and Conditions by you;
                  {'\n'}
                  15.1.4. Any other activities related to your account.
                </Text>
                15.2. You will provide legal defence to La Maison App and its
                affiliates in any legal claims arising from the above-mentioned
                issues.
                {'\n'}
                15.3. This indemnification and defence obligation will continue
                even after the termination or suspension of your account and/or
                use of the marketplace.
                {'\n'}
                15.4. La Maison App shall not be liable for any indirect,
                incidental, special, consequential or punitive damages,
                including loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or
                inability to access or use the services; any conduct or content
                of any third party on the services; unauthorised access, use or
                alteration of your transmissions or content, whether based on
                warranty, contract, tort (including negligence) or any other
                legal theory, whether or not we have been informed of the
                possibility of such damage, and even if a remedy set forth
                herein is found to have failed its essential purpose.
                {'\n'}
                15.5. Neither party shall be liable for any failure to perform
                its obligations where such failure results from any cause beyond
                the party's reasonable control, including, but not limited to,
                mechanical, electronic or communications failure or degradation,
                natural disasters, or other acts of God.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}16. Termination and Suspension
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                16.1. La Maison App retains the right to terminate or suspend
                your account at its sole discretion without prior notice, based
                on the following grounds:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  16.1.1. Breach of these Terms and Conditions;
                  {'\n'}
                  16.1.2. Engagement in fraudulent or illegal activities;
                  {'\n'}
                  16.1.3. Conduct that is harmful to other users, the
                  marketplace, or its affiliates.
                </Text>
                16.2. Procedure for Suspension/Termination:
                {'\n'}
                <Text style={{marginLeft: 20}}>
                  16.2.1. Notification of potential suspension or termination
                  will be sent to the email associated with your account.
                  {'\n'}
                  16.2.2. Prior to any termination or suspension of an account
                  by La Maison App, the seller will be provided with a notice of
                  the issue and an opportunity to rectify the breach within a
                  specified period. Sellers have the right to appeal any
                  decision related to account suspension or termination through
                  our designated appeal process.
                </Text>
                16.3. Upon termination, all rights granted to you under these
                Terms and Conditions will immediately cease.
              </Text>
              <Text style={{fontWeight: 'bold'}}>
                {'\n'}
                {'\n'}17. Governing Law And Arbitration
              </Text>
              {'\n'}
              <Text style={{marginLeft: 10}}>
                17.1. These Terms and Conditions shall be governed by and
                construed under the laws of the United Kingdom.
                {'\n'}
                17.2. Exclusive jurisdiction for any dispute, claim, or
                controversy arising out of or relating to these Terms and
                Conditions will be in the courts of the United Kingdom.
                {'\n'}
                17.3. You expressly agree to the exclusive jurisdiction of said
                courts and waive any right to argue that the courts are an
                inconvenient forum for resolving their disputes.
                {'\n'}
                17.4. Any legal proceedings against La Maison App must be
                commenced in the specified location in the United Kingdom.
                {'\n'}
                17.5. In the event of a dispute, parties will first attempt to
                resolve their differences amicably through mediation. If
                mediation is unsuccessful, disputes will be resolved through
                binding arbitration, subject to the rules of London Control of
                International Arbitration.
              </Text>
              {'\n'}
              {'\n'}
              For any inquiries or questions regarding these Seller Terms and
              Conditions, please contact our customer support at
              lamaisonapptld@gmail.com. By ensuring that these terms are
              comprehensive and clear, you can help maintain a safe, reliable,
              and efficient marketplace for both sellers and buyers.
            </Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',

    width: wp2(100),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    marginBottom: hp2(2),
  },
  heading: {
    color: 'black',
    fontSize: rfv(18),
    fontWeight: '700',
    marginLeft: wp2(14),
  },
});
