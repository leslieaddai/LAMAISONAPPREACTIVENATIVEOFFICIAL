import React from 'react';
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
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function PrivacyScreen(props) {
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <NewHeaderComp
          title={'Privacy & Security'}
          arrowNavigation={() => props.navigation.goBack()}
          movePreviousArrow={true}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp2(8),
            paddingBottom: hp2(2),
          }}>
          <Text style={{color: 'black', textAlign: 'justify'}}>
            1.1. Our mission is to provide you with a platform that caters to
            all your fashion needs from sellers across the globe and allow you
            to find your unique preferences in fashion worldwide. As we traverse
            the intricate landscape of digital privacy, our dedication to
            protecting your personal information stands at the forefront of our
            priorities. This Privacy Policy is crafted to clearly illustrate how
            we collect, use, share, and safeguard your data, ensuring
            transparency and trust in every interaction with our platform.
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}2. Consent and Opt-In Mechanisms
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              2.1. We prioritise transparent and informed consent practices to
              ensure you fully understand and control how your personal data is
              used. We employ explicit opt-in mechanisms to gather your consent,
              adhering to the highest standards of data protection and user
              privacy:
              {'\n'}
              2.1.1. We require your active confirmation before processing your
              personal data. This is typically achieved through clear,
              unambiguous checkbox options that you must select to indicate your
              consent. This ensures that consent is freely given, specific,
              informed, and unambiguous, as required by data protection laws.
              {'\n'}
              2.1.2. For sensitive data, such as location related information,
              we employ enhanced consent procedures. You will be presented with
              specific details about the type of data collected, the purposes of
              its processing, and how it will be used, before you choose to give
              your consent.
              {'\n'}
              2.1.3. We provide granular choices about the types of data you
              agree to provide and the specific purposes you authorise. This
              approach allows you to control the scope of consent and to limit
              how certain data is used, such as for direct marketing or
              third-party sharing.
              {'\n'}
              2.1.4. We periodically review and refresh consent to ensure that
              it remains relevant and up to date with any changes in our
              services or regulatory requirements. You will be notified and
              asked to renew your consent if significant changes occur that
              affect the nature of the processing, or the type of data
              collected.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}3. Types of Information Collected
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              3.1. To effectively support your journey towards the fashion
              world, we meticulously gather various types of information:
              {'\n'}
              3.1.1. Personal Identification Information: This includes
              essential details such as your name, date of birth, and email
              address, which help us personalise your experience.
              {'\n'}
              3.1.2. Location Information: We collect your geographical
              information to provide services and suggestions that are relevant
              to your location, enhancing the personalization and relevance of
              our offerings.
              {'\n'}
              3.1.3. Interest and Behavioral Data: We gather data regarding your
              interests and behavioural patterns to better comprehend and cater
              to your preferences, ensuring our services are as relevant and
              effective as possible.
              {'\n'}
              3.1.4. Usage Data: Insights into how you interact with our app are
              crucial for us; they help in refining its functionality and
              enhancing overall user friendliness.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}4. Data Collection Methods
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              4.1. Our collection methods are meticulously designed to uphold
              the highest standards of data protection:
              {'\n'}
              4.1.1. We gather information that you directly provide during the
              registration process and through your interactions with our
              services. This includes any personal details, preferences, and
              feedback you share with us.
              {'\n'}
              4.1.2. We employ technologies such as cookies and tracking tools
              to improve your experience. These tools help us remember your
              preferences, analyse your usage patterns, and gather comprehensive
              statistics on how you interact with our app.
              {'\n'}
              4.1.3. With your permission, we collect location data to provide
              services that are tailored to your surroundings, ensuring that our
              offerings are relevant and customised to your local context.
              {'\n'}
              4.1.4. To augment our services and provide you with a richer
              experience, we collaborate with trusted third-party services. We
              collect information through these partnerships only with your
              consent, ensuring that your data is handled with care and respect
              for your privacy.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}5. Use of Cookies and Tracking Technologies
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              5.1. Our app uses cookies and similar tracking technologies to
              track the activity on our services and hold certain information.
              Cookies used by our app include:
              {'\n'}
              5.1.1. Session Cookies to operate our service.
              {'\n'}
              5.1.2. Preference Cookies to remember your preferences and various
              settings.
              {'\n'}
              5.1.3. Security Cookies for security purposes.
              {'\n'}
              5.2. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}6. Use of Information
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              6.1. The information we collect is vital for delivering
              personalised options that tailored specifically to your needs:
              {'\n'}
              6.1.1. Location-Based Services: We use your geographic data to
              offer localised content and services, ensuring that what you
              receive is relevant to your immediate environment. This approach
              helps in providing timely and context-specific support, enhancing
              the effectiveness of our interventions.
              {'\n'}
              6.1.2. Interest-Based Services: We actively collect and analyse
              information related to your interests and behaviour patterns. This
              enables us to show products that are more engaging and responsive
              to your personal preferences, thereby improving the impact and
              relevance of our support.
              {'\n'}
              6.1.3. Enhanced User Experience: We continually refine our app
              based on how you interact with it. Your usage data helps us
              identify areas for improvement, drive innovation, and ensure that
              our app remains intuitive, user-friendly, and aligned with your
              needs. This ongoing process of enhancement helps us deliver a
              seamless and supportive digital experience.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}7. Data Retention Policy
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              7.1. We are committed to retaining your personal data only for as
              long as is necessary to fulfil the specific purposes for which it
              was originally collected. Our retention periods are carefully
              determined based on the nature of the data, the reasons for
              collecting the data, and the pertinent legal or operational
              retention needs.
              {'\n'}
              7.2. Your personal data is kept providing you with the requested
              services, comply with legal obligations, resolve disputes, and
              enforce our agreements. This ensures that we have sufficient
              information to support any follow-up questions or issues and to
              comply with legal requirements.
              {'\n'}
              7.3. Retention Periods
              {'\n'}
              <Text style={{marginLeft: 20}}>
                7.3.1. We retain your account information as long as your
                account remains active. Should you choose to deactivate your
                account, we maintain your account data for an additional period
                of [specify period] to facilitate easy account reactivation at
                your request. After this period, your data will be anonymized or
                securely deleted unless further retention is required by law.
                {'\n'}
                7.3.2. Transactional data related to financial transactions,
                contracts, and other agreements are retained for a period of
                [specify period] following the completion of the transaction, in
                accordance with accounting laws and practices.
                {'\n'}
                7.3.3. For data that falls under legal or regulatory duties to
                retain data for a fixed period (for example, tax-related
                information), we retain these records for the period stipulated
                by the relevant laws.
              </Text>
              7.4. Our data retention protocols include regular reviews of the
              data we hold. If data is no longer necessary for any purpose and
              is not required by law to be retained, it is securely deleted or
              anonymized. This policy supports our commitment to handle data
              responsibly and to minimise data storage.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}8. Information Sharing and Disclosure
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              8.1. We are committed to sharing and disclosing your information
              responsibly and with the highest ethical standards:
              {'\n'}
              8.1.1. We prioritise your privacy by ensuring that your explicit
              consent is obtained before any of your data is shared. We believe
              in empowering you to make informed decisions about how your
              information is used.
              {'\n'}
              8.1.2. We disclose your information only when legally required to
              do so and strive to minimise the data shared to what is necessary
              under the law. Our commitment is to protect your privacy while
              complying with legal demands.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}9. Details on Third-Party Data Recipients
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              9.1. We partner with a select group of third-party service
              providers who play a crucial role in enhancing and managing our
              services. Our partnerships are guided by strict data protection
              standards to ensure your personal information remains secure and
              private:
              {'\n'}
              9.1.1. We utilise reputable cloud storage providers to securely
              store your personal data. These providers are chosen for their
              robust security measures and compliance with industry-standard
              data protection regulations, ensuring that your information is
              securely encrypted and maintained.
              {'\n'}
              9.1.2. To continuously improve the functionality and
              user-friendliness of our services, we collaborate with analytics
              partners. These specialists help us analyse how our services are
              used, providing insights that drive better service delivery. Data
              shared with analytics partners is aggregated or anonymized
              whenever possible to protect your privacy.
              {'\n'}
              9.1.3. We engage with advanced marketing platforms to help us
              target and optimise our promotional campaigns effectively. This
              allows us to offer you relevant and timely content and updates.
              These platforms are required to adhere to strict confidentiality
              and data protection agreements, ensuring they manage your data
              responsibly and in alignment with applicable laws.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}10. Data Security
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              10.1. We implement stringent security measures to ensure the
              highest level of protection for your personal information:
              {'\n'}
              10.1.1. We safeguard your data using state-of-the-art encryption
              technologies. All personal information, whether in transit between
              your device and our servers or at rest on our systems, is
              encrypted. This layer of security ensures that your data remains
              confidential and secure from unauthorised access.
              {'\n'}
              10.1.2. To maintain the integrity of our security frameworks, we
              conduct regular security audits. These assessments help us
              identify and remediate potential vulnerabilities promptly, thereby
              reinforcing the safety and resilience of our systems against
              emerging threats.
              {'\n'}
              10.1.3. Access to your personal data is strictly limited to
              authorised personnel. We enforce rigorous access control protocols
              to ensure that only team members who need to access data to
              perform their job duties can do so. These measures prevent
              unauthorised access and ensure that data handling complies with
              our high privacy standards.
              {'\n'}
              10.1.4. We invest in comprehensive privacy and security training
              for all employees. This education ensures that our team is not
              only aware of but also committed to following the best practices
              in data protection. By cultivating a culture of privacy awareness
              and compliance, we reinforce the protection of your personal
              information at every level of our organisation.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}11. User Rights and Choices
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              11.1. We empower you with comprehensive control over your personal
              data, affirming your rights under privacy laws:
              {'\n'}
              11.1.1. Access and Rectification: You are entitled to access your
              personal information that we hold at any time. If you find that
              any of this information is inaccurate or incomplete, you have the
              right to request corrections. This ensures that your data remains
              up-to-date and accurate, reflecting your current situation and
              preferences.
              {'\n'}
              11.1.2. Erasure (Right to Be Forgotten): You have the right to
              request the deletion of your personal data from our systems under
              certain conditions, such as when the data is no longer necessary
              for the purposes for which it was collected or when you choose to
              withdraw consent. This provides you with the ability to manage
              your information effectively and maintain your privacy according
              to your changing needs.
              {'\n'}
              11.1.3. Withdraw Consent: You have the autonomy to withdraw your
              consent regarding the processing of your personal data at any
              time. This right ensures that you have ongoing control over your
              information and our use of it. Withdrawing your consent will not
              affect the lawfulness of processing based on consent before its
              withdrawal, protecting both your interests and the integrity of
              our interactions up to that point.
              {'\n'}
              11.1.4. Right to Restrict Processing: You have the option to
              request a limitation on the processing of your personal data under
              specific circumstances. This right is applicable when you contest
              the accuracy of your personal data, if the processing is unlawful
              and you oppose the erasure of the data, or when we no longer need
              the data for the purposes of processing, but you require them for
              the establishment, exercise, or defence of legal claims.
              {'\n'}
              11.1.5. Right to Data Portability: You are entitled to obtain a
              copy of your personal data in a structured, commonly used, and
              machine-readable format. Additionally, you have the right to
              transmit this data to another controller without hindrance from
              us, where technically feasible. This right applies specifically to
              data you have provided to us, and when the processing is based on
              your consent or is necessary for the performance of a contract.
              {'\n'}
              11.1.6. Right to Object: You have the right to object to the
              processing of your personal data at any time, especially in cases
              where we rely on our legitimate interests as the ground for
              processing. If you object, we must cease processing your data
              unless we can demonstrate compelling legitimate grounds for the
              processing which override your interests, rights, and freedoms, or
              for the establishment, exercise, or defence of legal claims.
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}12. International Data Transfers
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              12.1. In the course of providing our services, it is often
              necessary to transfer your personal data across international
              borders. This section of our Privacy Policy is designed to clarify
              the circumstances under which such transfers may occur, the
              measures we take to ensure the security of your data, and your
              rights in relation to these transfers:
              {'\n'}
              12.2. Transfer Mechanisms
              {'\n'}
              <Text style={{marginLeft: 20}}>
                12.2.1. We transfer personal data outside of your jurisdiction
                only in compliance with laws applicable to us, using approved
                data transfer mechanisms. These mechanisms ensure that your
                personal data receives an adequate level of protection
                consistent with data protection laws of your jurisdiction. Such
                mechanisms may include:
                {'\n'}
                12.2.1.1. Data transfer agreements incorporating standard
                contractual clauses (SCCs) approved by the European Commission
                or relevant authorities, which contractually oblige the
                recipient to protect your personal data.
                {'\n'}
                12.2.1.2. Transfers to countries that have been deemed to
                provide an adequate level of data protection by relevant
                regulatory bodies.
                {'\n'}
                12.2.1.3. In the case of transfers to the United States or other
                non-EEA jurisdictions, reliance on Privacy Shield frameworks or
                other frameworks that are recognized as offering adequate
                protection.
              </Text>
              12.3. Safeguards and Protections
              {'\n'}
              <Text style={{marginLeft: 20}}>
                12.3.1. We implement robust technical and organisational
                safeguards to protect your personal data during and after the
                transfer process:
                {'\n'}
                12.3.1.1. All data transferred is encrypted both in transit and
                at rest.
                {'\n'}
                12.3.1.2. We conduct regular audits and inspections of our data
                processing and storage practices and those of our partners to
                ensure compliance with our high standards of data protection.
                {'\n'}
                12.3.1.3. Access to transferred data is strictly limited to
                individuals who need it to perform their job duties, and who are
                trained in the protection of personal data.
              </Text>
            </Text>
            <Text style={{fontWeight: 'bold'}}>
              {'\n'}
              {'\n'}13. Age Policy
            </Text>
            {'\n'}
            <Text style={{marginLeft: 10}}>
              13.1. Our services are specifically designed for users aged 18 and
              above. We are committed to protecting the privacy of all
              individuals, especially minors, and adhere strictly to legal age
              restrictions. We do not knowingly collect, use, or store personal
              data from anyone under the age of 18. In the event that we become
              aware that such information has been collected, we will take
              immediate steps to delete this data from our records. This policy
              ensures compliance with data protection regulations and
              underscores our commitment to safeguarding the privacy rights of
              younger internet users.
            </Text>
            For any questions or concerns about your data:
            {'\n'}Email: lamaisonapptld@gmail.com
            {'\n'}Attention: Data Protection Officer
            {'\n'}
            {'\n'}Changes to this policy will be communicated through your
            registered email and prominently displayed on our website. If you
            agree to the revised terms, you may continue using our services as
            usual. If you disagree with the changes, you have the option to
            discontinue use of our services and delete your account before the
            new terms take effect.
            {'\n'}
            {'\n'}By using our services, you consent to our data collection,
            use, and sharing practices as described in this Privacy Policy. You
            have the right to withdraw your consent at any time.
          </Text>
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
