<template>
  <Popup
    trigger="popup-tos"
    @dismiss="() => (expanded = false)"
    @present="() => (expanded = true)"
  >
    <template #content="{ Hide }">
      <section class="tos">
        <section class="data">
          <h1>Terms and Conditions</h1>
          <h2 id="introduction">1. INTRODUCTION</h2>
          <p>
            Welcome to our website. These Terms and Conditions (the "Legal
            Terms") are written by WoofWare Tech (the "Company," "we," or "us") and
            govern your use of our website, including all web pages within this
            website (collectively referred to as the "Services"). These Legal
            Terms constitute a legally binding agreement between you and the
            Company.
          </p>

          <h2 id="intellectual-property">2. INTELLECTUAL PROPERTY RIGHTS</h2>
          <p><strong>Our intellectual property</strong></p>
          <p>
            We are the owner or the licensee of all intellectual property rights
            in our Services, including all source code, databases,
            functionality, software, website designs, audio, video, text,
            photographs, and graphics in the Services (collectively, the
            "Content"), as well as the trademarks, service marks, and logos
            contained therein (the "Marks"). Our Content and Marks are protected
            by copyright and trademark laws (and various other intellectual
            property rights and unfair competition laws) and treaties in the
            United States and around the world. The Content and Marks are
            provided in or through the Services "AS IS" for your personal,
            non-commercial use or internal business purpose only.
          </p>

          <p><strong>Your use of our Services</strong></p>
          <p>
            Subject to your compliance with these Legal Terms, including the
            "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive,
            non-transferable, revocable license to:
          </p>
          <ul>
            <li>access the Services; and</li>
            <li>
              download or print a copy of any portion of the Content to which
              you have properly gained access.
            </li>
          </ul>
          <p>
            solely for your personal, non-commercial use or internal business
            purpose.
          </p>

          <h2 id="user-generated-contributions">
            3. USER GENERATED CONTRIBUTIONS
          </h2>
          <p>
            The Services does not offer users to submit or post content. We may
            provide you with the opportunity to create, submit, post, display,
            transmit, perform, publish, distribute, or broadcast content and
            materials to us or on the Services, including but not limited to
            text, writings, video, audio, photographs, graphics, comments,
            suggestions, or personal information or other material
            (collectively, "Contributions"). Contributions may be viewable by
            other users of the Services and through third-party websites. When
            you create or make available any Contributions, you thereby
            represent and warrant that:
          </p>

          <h2 id="services-management">4. SERVICES MANAGEMENT</h2>
          <p>
            We reserve the right, but not the obligation, to: (1) monitor the
            Services for violations of these Legal Terms; (2) take appropriate
            legal action against anyone who, in our sole discretion, violates
            the law or these Legal Terms, including without limitation,
            reporting such user to law enforcement authorities; (3) in our sole
            discretion and without limitation, refuse, restrict access to, limit
            the availability of, or disable (to the extent technologically
            feasible) any of your Contributions or any portion thereof; (4) in
            our sole discretion and without limitation, notice, or liability, to
            remove from the Services or otherwise disable all files and content
            that are excessive in size or are in any way burdensome to our
            systems; and (5) otherwise manage the Services in a manner designed
            to protect our rights and property and to facilitate the proper
            functioning of the Services.
          </p>

          <h2 id="term-and-termination">5. TERM AND TERMINATION</h2>
          <p>
            These Legal Terms shall remain in full force and effect while you
            use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE
            LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND
            WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES
            (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY
            REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF
            ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL
            TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR
            USE OR PARTICIPATION IN THE SERVICES OR DELETE ANY CONTENT OR
            INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
            SOLE DISCRETION.
          </p>

          <h2 id="modifications-and-interruptions">
            6. MODIFICATIONS AND INTERRUPTIONS
          </h2>
          <p>
            We reserve the right to change, modify, or remove the contents of
            the Services at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our Services. We will not be liable to you or any
            third party for any modification, price change, suspension, or
            discontinuance of the Services.
          </p>

          <h2 id="governing-law">7. GOVERNING LAW</h2>
          <p>
            These Legal Terms shall be governed by and defined following the laws of the Philippines. [Your Name] and yourself irrevocably consent that the courts of the Philippines shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
          </p>

          <h2 id="dispute-resolution">8. DISPUTE RESOLUTION</h2>
          <p><strong>Informal Negotiations</strong></p>
          <p>
            To expedite resolution and control the cost of any dispute,
            controversy, or claim related to these Legal Terms (each a "Dispute"
            and collectively, the "Disputes") brought by either you or us
            (individually, a "Party" and collectively, the "Parties"), the
            Parties agree to first attempt to negotiate any Dispute (except
            those Disputes expressly provided below) informally for at least 60 days before initiating arbitration. Such informal
            negotiations commence upon written notice from one Party to the
            other Party.
          </p>

          <h2 id="restrictions">9. RESTRICTIONS</h2>
          <p>
            The Parties agree that any arbitration shall be limited to the
            Dispute between the Parties individually. To the full extent
            permitted by law, (a) no arbitration shall be joined with any other
            proceeding; (b) there is no right or authority for any Dispute to be
            arbitrated on a class-action basis or to utilize class-action
            procedures; and (c) there is no right or authority for any Dispute
            to be brought in a purported representative capacity on behalf of
            the general public or any other persons.
          </p>

          <h2 id="termination">10. TERMINATION</h2>
          <p>
            At its sole discretion, WoofWare Tech may modify or discontinue the
            Services, or may modify or terminate your access to the Services,
            for any reason, with or without notice to you and without liability
            to you or any third party.
          </p>

          <h2 id="additional-terms">11. ADDITIONAL TERMS</h2>
          <p><strong>Assignment</strong></p>
          <p>
            WoofWare Tech shall be permitted to assign, transfer, and subcontract
            its rights and/or obligations under these Legal Terms without any
            notification or consent required. However, you shall not be
            permitted to assign, transfer, or subcontract any of your rights
            and/or obligations under these Legal Terms.
          </p>

          <h2 id="entire-agreement">12. ENTIRE AGREEMENT</h2>
          <p>
            These Legal Terms, including any legal notices and disclaimers
            contained on the Services, constitute the entire agreement between
            WoofWare Tech and you in relation to your use of the Services and
            supersede all prior agreements and understandings with respect to
            the same.
          </p>

          <h2 id="changes">13. CHANGES</h2>
          <p>
            Woofware Tech reserves the right, in its sole discretion, to change the
            Legal Terms under which the Services are offered. The most current
            version of the Legal Terms will supersede all previous versions.
            Woofware Tech encourages you to periodically review the Legal Terms to
            stay informed of our updates.
          </p>

          <h2 id="contact">14. CONTACT</h2>
          <p>
            WoofWare Tech welcomes your questions or comments regarding the Legal
            Terms:
          </p>
          <p>Email Address: pawprints8223@gmail.com</p>

          <h2 id="terms">15. TERMS</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these
            Legal Terms of Service, all applicable laws and regulations, and
            agree that you are responsible for compliance with any applicable
            local laws. If you do not agree with any of these terms, you are
            prohibited from using or accessing this site. The materials
            contained in this website are protected by applicable copyright and
            trademark law.
          </p>

          <h2 id="contact">16. CONTACT US</h2>
          <p>
            In order to resolve a complaint regarding the Services or to receive
            further information regarding use of the Services, please contact us
            at:
          </p>
          <p>Email Address: pawprints8223@gmail.com</p>
          <p><em>These terms of use were created using Termly's Terms and Conditions
            Generator</em>
          </p>
        </section>
        <section class="buttons">
          <ButtonDanger value="Decline" @click="Hide" />
          <ButtonSuccess
            value="Accept"
            @click="
              () => {
                Accept();
                Hide();
              }
            "
          />
        </section>
      </section>
    </template>
  </Popup>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ButtonDanger, ButtonSuccess, Popup } from "..";

const expanded = ref(false);

const Accept = () => emit("accept");
const emit = defineEmits(["accept"]);
</script>
<style scoped>
.tos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: var(--theme-secondary-background);
  border-radius: 20px;
  width: 90vw;
  height: 50vh;
  min-height: 300px;
  gap: 20px;
}

.data {
  flex: 1 0 0;
  overflow-y: scroll;
}

.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 23px;
}

h2 {
  font-size: 20px;
}

p {
  font-size: 10px;
  text-align: justify;
}
li {
  font-size: 10px;
  text-align: justify;
}
</style>
