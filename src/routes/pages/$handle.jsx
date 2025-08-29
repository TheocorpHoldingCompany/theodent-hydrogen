import {Suspense} from 'react';
import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {gql} from '@shopify/hydrogen';

import {FooterBtns} from '~/components/sections/FooterButtons.server';
import {IconBar, ProductDetail} from '~/components';
import {ContactForm} from '~/components/context/ContactForm.client';
import {PageHeader} from '~/components/sections/PageHeader.server';
import {NotFound, Layout} from '~/components/index.server';
import {StoreLocator} from './StoreLocator.client';
import {ClinicalForm} from './ClinicalForm.client';
import {Map} from '~/components/map/Map.client';
import {WholesaleForm} from './Wholesale.client';
import {Share} from '~/components/sections';

export const meta = ({data}) => {
  const page = data?.page;
  const title = page?.seo?.title || page?.title || 'Page';
  const description = page?.seo?.description || '';
  return [
    {title},
    {name: 'description', content: description},
    {property: 'og:image', content: 'http://shoptheodent.com/imgs/landingOG.png'},
    {property: 'og:image:height', content: '600'},
    {property: 'og:image:width', content: '400'},
  ];
};

export async function loader({params, context}) {
  const {handle} = params;
  const languageCode = context.storefront.i18n.language;
  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {languageCode, handle},
    cache: {mode: 'public', maxAge: 60},
  });
  return json({page, handle});
}

export default function Page() {
  const {page, handle} = useLoaderData();
  if (!page) return <NotFound />;

  const pages = {
    faqs: <FaqPage />,
    company: <CompanyPage />,
    wholesale: <WholesalePage />,
    'contact-us': <ContactPage />,
    'store-locator': <StoreLocator page={page} />,
    ingredients: <IngredientsPage />,
    'privacy-policy': <PrivacyPolicyPage />,
    'clinical-information': <ClinicalPage />,
    'shipping-returns': <ShippingNReturnsPage />,
    technology: <AboutPage handle={handle} page={page} />,
  };
  return (
    <Layout>
      <Suspense />
      {pages[handle]}
    </Layout>
  );
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode, $handle: String!)
  @inContext(language: $languageCode) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

const FindUsPage = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="theo-h1">Find Theodent Near You</div>
          <div className="theo-h3">Enter City or Postal Code</div>
          <input />
          <div className="theo-btn">SEARCH NEARBY STORES</div>
        </div>
        <div
          className="col-12 col-md-8"
          style={{height: 'calc(100vh - 300px)'}}
        >
          <Map />
        </div>
      </div>
    </div>
  );
};

export const WholesalePage = () => {
  return (
    <>
      <PageHeader imgPath="/imgs/blackFridayBanner2.png" title="WHOLESALERS" />
      <div className="container mb-5">
        <div
          className="d-flex justify-content-center mt-5"
          style={{width: '100%'}}
        >
          <WholesaleForm />
        </div>
      </div>
    </>
  );
};

const AboutPage = ({handle, page}) => {
  return (
    <>
      <PageHeader
        imgPath="/imgs/blackFridayBanner2.png"
        preHeader="THE TECHNOLOGY"
        title="What Makes Theodent the #1 Fluoride Alternative?"
      />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920}} className="">
          <div className="pages-p" style={{marginTop: 20}}>
            Theodent is a landmark breakthrough in oral care. But, what exactly
            makes it a safer, more effective option than fluoride-based
            toothpastes? Let’s simplify the science so you can make a more
            informed decision for you and your family.
          </div>

          <div className="row pt-5">
            <div className="col-12 col-md-6">
              <div className="pages-pre-header">Share this article</div>
              <Share handle={`https://theodent.com/pages/${handle}`} />
              <div
                style={{width: 300, height: 2, background: '#CC8A52'}}
                className=""
              />
            </div>
          </div>

          <div className="pages-h2 mt-5">
            Some of Today’s Greatest Medical Technologies Emerged by Mere Chance
          </div>
          <div className="pages-p mt-3">
            Penicillin. X-rays. Insulin. Many of our most important medical
            applications since the late 19th century were not planned
            destinations. They were detours.
          </div>
          <div className="pages-p mt-3">
            Before Theodent introduced a new class of luxury toothpaste, it was
            also a detour. Our product follows a distinguished line of
            “accidental” discoveries that have catapulted science forward in
            profound ways.
          </div>
          <div className="pages-p mt-3">
            Theodent’s role in upending traditional views on fluoride cannot be
            overstated. To see why, we have to understand how something as
            routine as brushing is so important in the first place.
          </div>
          <div className="pages-h2 mt-5">
            Oral Care Isn’t Just About Dental Health, It’s About Your Overall
            Health
          </div>
          <div className="pages-p mt-3">
            We are told from an early age that brushing is important. It keeps
            our mouths clean, our teeth pretty, and our breath fresh.
          </div>
          <div className="pages-p mt-3">
            What we hear less often is how imperative it is to the rest of our
            bodies.
          </div>
          <div className="pages-p mt-3">
            Just as they take in the food we eat and air we breathe, our mouths
            are also gateways for harmful bacteria and infections, which may
            lead to complications in our bones, heart, kidneys, and other
            organs.
          </div>
          <div className="pages-p mt-3">
            Dental hygiene is therefore a first line of defense since issues
            like cavities and gum disease weaken our ability to fight off
            invaders at the source. Simply put, our broader wellbeing hinges
            greatly on a healthy smile.
          </div>
          <div className="pages-h2 mt-5">
            Our Natural Defenses Take Us Only So Far
          </div>
          <div className="pages-p mt-3">
            Teeth play an important role in many of our internal systems. This
            includes housing vital nerves and blood vessels in the mouth. To
            safeguard them, our teeth build multiple layers of protection
            starting with enamel. The hardest tissue in the body, enamel is
            mostly made of a mineral called hydroxylapatite, which looks like a
            cluster of tiny crystals when seen under a microscope.
          </div>
          <div className="pages-p mt-3">
            The layer beneath your enamel is known as dentin. Although dentin is
            also a hard tissue, it is porous and contains small tubes leading to
            the nerves in your teeth.
          </div>
          <div className="pages-p mt-3">
            Dentin is gradually exposed as your enamel erodes over time. When
            that happens, your teeth become hypersensitive and painful.
            Continued exposure eventually causes dentin decay and cavities.
            Fruit juice, soft drinks, wine, and other acidic and sugary products
            can accelerate this process, especially when combined with poor
            hygiene habits.
          </div>
          <div className="pages-h2 mt-5">
            Fluoride: A Once-Popular Solution That’s Lost Its Appeal
          </div>
          <div className="pages-p mt-3">
            Over 100 years ago, scientists found that fluoride could help
            prevent tooth decay. Widespread commercial production of
            fluoride-based toothpastes then began in the 1950s. These products
            have been considered the standard ever since and make up the vast
            majority of global toothpaste sales.
          </div>
          <div className="pages-p mt-3">
            However, when it comes to fluoride and long-term health, there’s a
            catch: fluoride is a poison.
          </div>
          <div className="pages-p mt-3">
            Specifically, studies have shown fluoride to be a neurotoxicant.
            Even low levels of ingestion are toxic to the body. In fact, the FDA
            requires a warning on fluoride toothpaste urging a call to Poison
            Control if too much is swallowed.
          </div>
          <div className="pages-p mt-3">
            Research has linked fluoride to conditions such as:
          </div>
          <div
            className="pages-p d-flex align-items-center mt-3"
            style={{fontWeight: 600}}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#2A1B16',
                marginLeft: 13,
                marginTop: 2,
                marginRight: 10,
              }}
            />
            Reduced IQ in children (1)
          </div>
          <div
            className="pages-p d-flex align-items-center"
            style={{fontWeight: 600}}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#2A1B16',
                marginLeft: 13,
                marginTop: 2,
                marginRight: 10,
              }}
            />
            Fluoride calcification or hardening of the pineal gland (2)
          </div>
          <div
            className="pages-p d-flex align-items-center"
            style={{fontWeight: 600}}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#2A1B16',
                marginLeft: 13,
                marginTop: 2,
                marginRight: 10,
              }}
            />
            Dental fluorosis (tooth discoloration) (3)
          </div>
          <div
            className="pages-p d-flex align-items-center"
            style={{fontWeight: 600}}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#2A1B16',
                marginLeft: 13,
                marginTop: 2,
                marginRight: 10,
              }}
            />
            Thyroid disease (4)
          </div>
          <div
            className="pages-p d-flex align-items-center"
            style={{fontWeight: 600}}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#2A1B16',
                marginLeft: 13,
                marginTop: 2,
                marginRight: 10,
              }}
            />
            Skeletal fluorosis (bone disease) (5)
          </div>
          <div className="pages-p mt-3">
            This is particularly concerning for developing children, who have
            been found to ingest as much as 75% of their toothpaste while
            brushing (6). Understanding you must spit out what tastes delicious
            is confusing for a child.
          </div>
          <div className="pages-p mt-3">
            As important as it is to fight dental disease, protection of one
            aspect of our health cannot come at the cost of others. Why, then,
            has relatively little attention been given to this part of our
            everyday lives despite its crucial impact on our wellbeing?
          </div>
          <div className="pages-p mt-3">
            Fortunately, growing awareness of fluoride’s adverse effects has
            combined with innovative science to usher in a new era of oral care.
          </div>
          <div className="pages-h2 mt-5">
            Superior Tooth Protection Where No One Thought to Look
          </div>
          <div className="pages-p mt-3">
            For decades, dental experts claimed fluoride to be the only chemical
            able to prevent tooth decay. This changed in the early 1990s thanks
            to a chance finding that not only led to an alternative, but one
            that is completely safe.
          </div>
          <div className="pages-p mt-3">
            Researchers discovered that a molecule called theobromine grows
            enamel crystal structure in our teeth. Moreover, theobromine—which
            is readily found in, of all places, cacao—is far superior to
            fluoride in strengthening this structure. It creates larger,
            stronger crystals that better protect enamel and dentin, improve
            remineralization, and eliminate hypersensitivity.
          </div>
          <div className="pages-p mt-3">
            And, critically, there’s no danger to your system if it’s swallowed.
          </div>
          <div className="pages-p mt-3">
            Years of research and development followed. The team isolated
            theobromine in cacao while leaving out the harmful fats and sugars
            found in processed chocolate. They then combined this active
            ingredient with calcium and phosphate into a proprietary formula.
          </div>
          <div className="pages-p mt-3">
            The introduction of “Rennou,” as the formula was named, marked an
            unprecedented moment in the history of dental health.
          </div>
          <div className="pages-h2 mt-5">
            Rennou: The Safer, More Effective Alternative to Fluoride
          </div>
          <div className="pages-p mt-3">
            Rennou became the foundation of a groundbreaking new toothpaste:
            Theodent.
          </div>
          <div className="pages-p mt-3">
            Since 2012, Theodent has been the single-most effective alternative
            to fluoride-based toothpastes. It has outperformed leading brands
            such as Colgate and prescription toothpastes like Sensodyne Nupro
            5000. Theodent also clearly surpasses other fluoride-free options
            that have simply removed fluoride rather than replacing it.
          </div>
          <div className="pages-p mt-3">
            Data suggests that it takes 71 times more fluoride to produce the
            same remineralization effects as Rennou (7). After only one week of
            brushing twice a day, 100% of the tubes exposed in dentin are fully
            or partially protected. These are stronger results in less time than
            fluoride can provide, making Theodent significantly better at
            hardening teeth and reducing hypersensitivity.
          </div>
          <div className="pages-p mt-3">
            Importantly, unlike fluoride, Theodent is nontoxic. It is not
            harmful if swallowed by people of any age, and therefore does not
            need the Poison Control warning required for all fluoride
            toothpastes. In short, Rennou-based Theodent exceeds the standards
            to meet the US FDA’s highest food safety designation.
          </div>
          <div
            style={{width: '100%'}}
            className="d-flex justify-content-center"
          >
            <img
              alt="Theodent Rennou technology comparison chart showing fluoride alternative effectiveness"
              src="/imgs/technologyImg1.png"
              style={{
                width: '100%',
                maxWidth: 800,
                marginTop: 60,
                marginBottom: 60,
              }}
            />
          </div>
          <div className="pages-h2">Theodent: Refinement in Oral Care</div>
          <div className="pages-p mt-3">
            Dental disease is one of humanity’s most common afflictions. It is
            also one of the most preventable. Through scientific discovery, we
            are learning that standard oral health treatments —such as
            fluoride—are no longer the best option. Instead, Theodent offers
            solutions that are safer, deliver better results, and meet the
            demands of a smarter marketplace.
          </div>
          <div className="pages-p mt-3">
            Theodent is now being sold worldwide to discerning consumers, who
            seek out sophisticated products that support their overall wellness.
          </div>
          <div
            style={{width: '100%', borderBottom: '2px solid #CC8A51'}}
            className="mt-5"
          >
            <ProductDetail
              title="Technology Footnotes"
              content={<TechFootnotes />}
            />
          </div>
          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const TechFootnotes = () => {
  return (
    <>
      <div style={{marginTop: 12}}>
        1-a) Xiang Q. Liang Y. Chen L. et al. Effect of fluoride in drinking
        water on children’s intelligence. Fluoride 36: 84-94, 2003.
      </div>
      <div style={{marginTop: 12}}>
        1-b) Khan S.A. Singh R.K. Navit S. et al. Relationship Between Dental
        Fluorosis and Intelligence Quotient of School Going Children In and
        Around Lucknow District: A Cross-Sectional Study. J Clin Diagn Res
        Nov;9(11):ZC10-15. doi: 10.7860/JCDR/2015/15518.6726, 2015.
      </div>
      <div style={{marginTop: 12}}>
        1-c) Sebastian S.T. and Sunitha S. A cross-sectional study to assess the
        intelligence quotient (IQ) of school going children aged 10-12 years in
        villages of Mysore district, India with different fluoride levels. J
        Indian Soc Pedod Prev Dent 33: 307-311, 2015.
      </div>
      <div style={{marginTop: 12}}>
        1-d) Seraj B. Shahrabi M. Shadfar M. et al. Effect of high water
        fluoride concentration on the intellectual development of children in
        makoo/iran. J Dent (Tehran) 9: 221-229, 2012.
      </div>
      <div style={{marginTop: 12}}>
        1-e) Green R, Lanphear B, Hornung R, Flora D, Martinez-Mier EA, Neufeld
        R, et al. Association between maternal fluoride exposure during
        pregnancy and IQ scores in offspring in Canada. Journal of American
        Medical Association Pediatrics. 2019;173:940-948. DOI:
        10.1001/jamapediatrics.2019.1729
      </div>
      <div style={{marginTop: 12}}>
        2-a) Tapp E. and Huxley M. The weight and degree of calcification of the
        pineal gland. JPath 105: 31-39, 1971.
      </div>
      <div style={{marginTop: 12}}>
        2-b) Luke J. Fluoride deposition in the aged human pineal gland. Caries
        Res 35: 125-128, 2001.
      </div>
      <div style={{marginTop: 12}}>
        2-c) Kunz D. Schmitz S. Mahlberg R. et al. A new concept for melatonin
        deficit: on pineal calcification and melatonin excretion.
        Neuropsychopharmacology 21: 765-772,1999.
      </div>
      <div style={{marginTop: 12}}>
        2-d) Mahlberg R. Kienast T. Sven Hadel S. et al. Degree of pineal
        calcification (DOC) is associated with polysomnographic sleep measures
        in primary insomnia patients. Sleep Medicine 10: 439-445, 2009.
      </div>
      <div style={{marginTop: 12}}>
        3-a) Bhagavatula P. Levy S.M. Broffitt B. et al. Timing of fluoride
        intake and dental fluorosis on late-erupting permanent teeth. Community
        Dent Oral Epidemiol 44: 32-45, 2016.
      </div>
      <div style={{marginTop: 12}}>
        .3-b) Morgan L. Allres D. Tavares M. et al. Investigation of the
        possible associations between fluorosis, fluoride exposure, and
        childhood behavior problems. Pediatr Dent 20: 244-252, 1998.
      </div>
      <div style={{marginTop: 12}}>
        3-c) Lalumandier J.A. and Rozier R.G. The prevalence and risk factors of
        fluorosis among patients in a pediatric dental practice. Pediatr Dent
        17: 19-25, 1995
      </div>
      <div style={{marginTop: 12}}>
        4-a) Susheela A.K. Bhatnagar M. Vig K. et al. Excess fluoride ingestion
        and thyroid hormone derangements in children living in delhi, india.
        Fluoride 38: 98-108, 2005.
      </div>
      <div style={{marginTop: 12}}>
        4-b) Haddow J.E. Palomaki G.E. Allan W.C. et al. Maternal thyroid
        deficiency during pregnancy and subsequent neuropsychological
        development of the child. N Engl J Med341: 549-555, 1999.
      </div>
      <div style={{marginTop: 12}}>
        4-c) Singh N. Verma K.G. and Verma P. A comparative study of fluoride
        ingestion levels, serum thyroid hormone & TSH level derangements, dental
        fluorosis status among school children from endemic and non-endemic
        fluorosis areas. Springerplus 3:7. doi: 10.1186/2193-1801-3-7, 2014 Jan
        3.
      </div>
      <div style={{marginTop: 12}}>
        5-a) Sandhu R. Lal H. Kundu Z.S. et al. Serum fluoride and sialic acid
        levels in osteosarcoma. Biol Trace Elem Res 144(1-3):1-5. doi:
        10.1007/s12011- 009-8382-1, 2011.
      </div>
      <div style={{marginTop: 12}}>
        5-b) Ramesh N. Vuayaraghavan A.S. Desai B.S. et al. Low levels of p53
        mutations in Indian patients with osteosarcoma and the correlation with
        fluoride levels in bone. J Environ Pathol Toxicol Oncol 20(3): 237-243,
        2001.
      </div>
      <div style={{marginTop: 12}}>
        5-c) Bassin E.B. Wypij D. Davis R.B. et al. Age-specific fluoride
        exposure in drinking water and osteosarcoma (United States) Cancer
        Causes Control 17:421-428, 2006.
      </div>
      <div style={{marginTop: 12}}>
        .5-d) Eyre R. Feltbower R.G. Mubwandarikwa E. et al. Epidemiology of
        bone tumours in children and young adults. Pediatr Blood Cancer 53:
        941-952, 2009.
      </div>
      <div style={{marginTop: 12}}>
        6-a) Levy S.M. Warren J.J. Davis C.S. et al. Patterns of fluoride intake
        from birth to 36 months. J Public Health Dent 61: 70-77, 2001.
      </div>
      <div style={{marginTop: 12}}>
        6-b) Zero D.T. Dentifrices, mouthwashes, and remineralization/caries
        arrestment strategies. BMC Oral Health 6(Suppl 1):S9
        doi:10.1186/1472-6831-6- S1-S9, 2006.
      </div>
      <div style={{marginTop: 12}}>
        6-c) Singer L. and Ophaug R. Total fluoride intake of infants.
        Pediatrics 63: 460-466, 1979. 16.
      </div>
      <div style={{marginTop: 12}}>
        6-d) Guha-Chowdhury N. Drummond B.K. and Smillie A.C. Total fluoride
        intake in children aged 3 to 4 years—- a longitudinal study. J Dent
        Res75: 1451-1457,1996.
      </div>
      <div style={{marginTop: 12}}>
        7-a) Amechi, B.T., Poeteous, N., Ramalingam, K., Mensinkai, P.K.,
        Ccahuana Vasquez, R.A., Sadeghpour, A., and Nakamoto, T.
        Remineralization of artificial enamel lesions by theobromine. Caries
        Res. 47: 399-405, 2013
      </div>
    </>
  );
};

const FaqPage = () => {
  return (
    <>
      <PageHeader
        imgPath="/imgs/blackFridayBanner2.png"
        title={`FAQ's`}
        border={false}
      />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920, width: '100%'}} className="mt-3">
          <ProductDetail
            title="What is Theodent toothpaste?"
            content="Theodent is an American oral care company manufacturing a revolutionary line of fluoride-free dentifrices containing Rennou™ as an active ingredient. Theodent is great for everyone, and our clinical research indicates it’s particularly effective at remineralizing tooth enamel and reducing hypersensitivity."
          />
          <ProductDetail
            title="Will Theodent help my sensitivity?"
            content="Theodent is the best toothpaste in the world for relieving hypersensitivity. Research has shown that it takes 70 times more fluoride to have a comparable remineralization effect to Rennou™. Importantly, Rennou™ is non-toxic and a far better solution for relieving painful sensitivity. Many patients will feel results in as little as 3-7 days."
          />
          <ProductDetail
            title="What are the types/flavors of Theodent toothpaste?"
            content='There are three toothpastes in the Theodent family. Theodent Classic toothpaste (spearmint flavor) and Theodent Kids toothpaste (chocolate chip flavor) are available here and at dental offices, pharmacies, grocers, natural food stores, and lifestyle boutiques near you and in select international markets. Theodent 300 toothpaste (spearmint flavor) is our clinical-strength toothpaste, similar in formulation to Theodent Classic but with an increased concentration of Rennou, the theobromine-based active ingredient. Theodent 300 can also be found in dental offices, pharmacies, grocers, lifestyle boutiques, and in famed luxury retailers like Harrod’s in London. Theodent 300 is known as “the world’s finest toothpaste". All three products are designed to be used as a twice-daily toothpaste.'
          />
          <ProductDetail
            title="What are theobromine and Rennou?"
            content="Rennou is the safe-to-swallow active ingredient in all Theodent toothpaste products. Rennou is comprised of three components: theobromine, calcium, & phosphate. Theobromine is an amazing compound with many beneficial health properties and occurs naturally in the cacao plant. The ratio of theobromine, calcium, & phosphate in our formulation is proprietary and only efficacious in a specific combination. Clinical research indicates that Rennou is more effective than fluoride at remineralizing enamel and hardening teeth. Rennou, Theodent’s active ingredient, also has GRAS (generally regarded as safe) designation from the FDA, the highest standard in food safety. Theodent Toothpastes are currently the only toothpastes that contain Rennou."
          />
          <ProductDetail
            title="Is chocolate bad for your teeth?"
            content="Commercial chocolate generally contains cocoa fat and added sugar which is cariogenic (cavity-causing). Theodent’s interest in chocolate focuses only on one component of cacao, theobromine, which must first be refined into a pharmaceuticalgrade pure crystalline powder before it can be evenly distributed into our toothpaste."
          />
          <ProductDetail
            title="What’s wrong with fluoride? Why is Theodent better?"
            content={
              <>
                Please refer to our page dedicated to the technology. It can be
                found <a href="/pages/technology">here</a>.
              </>
            }
          />
          <ProductDetail
            title="How do I apply Theodent correctly?"
            content="Theodent is designed to be used like any other toothpaste. We recommend brushing twice daily for two minutes. Rinse and repeat! Rennou™ works on contact, so for those with extreme sensitivity, you may choose to let the product sit on the tooth’s surface for a longer period of time before rinsing."
          />
          <ProductDetail
            title="Is Theodent safe if swallowed?"
            content="All Theodent products are fluoride-free and safe if swallowed. Our active ingredient, Rennou™, even has GRAS (generally regarded as safe) status from the FDA, the highest standard in food safety. In particular, chocolate chip-flavored Theodent Kids toothpaste is a fantastic product for adults worried about their children swallowing fluoride in their toothpaste."
          />
          <ProductDetail
            title="What ingredients are in Theodent?"
            content={
              <>
                Please refer to the ingredients page found{' '}
                <a href="/pages/ingredients">here</a>, where we detail the
                ingredients and their functions in our formulation.
              </>
            }
          />
          <ProductDetail
            title="How long do I need to use Theodent to see an effect?"
            content="Theodent is formulated to remineralize on contact. Clinical data shows most patients see an effect from Theodent toothpaste in 3-7 days."
          />
          <ProductDetail
            title="What is SLS, and does Theodent Toothpaste contain it?"
            content="SLS is short for sodium laurel sulfate. Though it was common in toothpaste for decades, some people do experience rare side effects from it, like skin irritation in and around the mouth. Theodent products are proud to be SLS-free! Theodent Classic & Theodent 300 do contain similarly named sodium lauroyl sarcosinate, a coconut oil-derived replacement to SLS that offers a pleasant foamy texture without the risk of skin irritation. Theodent Kids does not contain either foaming agent."
          />
          <ProductDetail
            title="Is Theodent vegan?"
            content="There are no animal ingredients or animal-derived ingredients in any of Theodent’s products. Theodent products have never been and will never be tested on animals (other than humans)"
          />
          <ProductDetail
            title="Is Theodent Recyclable?"
            content="All components of Theodent’s packaging are recyclable."
          />
          <ProductDetail
            title="Where is Theodent Made?"
            content="Theodent is manufactured in an FDA-inspected and approved facility in the United States. From start to finish, all Theodent components are sourced from North America."
          />
          <div style={{width: '100%', height: 2, background: '#CC8A51'}} />
          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const CompanyPage = () => {
  return (
    <>
      <PageHeader imgPath="/imgs/contactBanner.webp" title={`The Company`} />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920}} className="">
          <div className="pages-p mt-3">
            Born in New Orleans, the Theodent oral care brand was developed from
            the research of Tetsuo Nakamoto, DDS, Ph.D. In the 1990s, along with
            two of his colleagues, Alexander Falster, MS, and William “Skip”
            Simmons, Ph.D., Dr. Nakamoto discovered a novel ingredient found in
            cacao that was highly effective at strengthening tooth enamel.
          </div>
          <div className="pages-p mt-3">
            Following this discovery, they continued their commercialization
            efforts and developed a line of premium toothpaste containing this
            novel ingredient they named “Rennou™.” This toothpaste offered the
            world the first ever viable alternative to fluoride.
          </div>
          <div className="pages-p mt-3">
            In 2012, the team launched Theodent toothpaste in two-thirds of
            Whole Foods Markets, the most premium and respected grocer in the
            United States. Shortly after, Theodent garnered significant
            international interest and quickly expanded globally, with
            distribution networks now set up in over 20 countries.
          </div>
          <div className="pages-p mt-3">
            As more consumers consider moving away from fluoride-based oral care
            products, seeking <a href="/pages/technology">safer and more effective fluoride alternatives</a>, Theodent will
            continue to expand its product offerings and raise the bar in global
            oral health.
          </div>
          <div className="pages-h1 mt-5">Our Mission</div>
          <div className="pages-pre-header mt-3">
            Theodent’s mission is to replace fluoride in the oral health
            marketplace by developing consumer and professional products with
            clean, safer, and more effective ingredients.
          </div>
          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const ClinicalPage = () => {
  return (
    <>
      <PageHeader
        imgPath="/imgs/blackFridayBanner2.png"
        title={`The Clinical Information`}
      />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920, width: '100%'}} className="clinical">
          <div className="pages-p mt-3">
            At Theodent, we understand that dental professionals are committed
            to providing the best care for their patients. They want to use
            effective, safe products supported by scientific evidence. That's
            why we're proud to offer our line of toothpastes featuring Rennou™.
            This powerful and non-toxic active ingredient has been clinically
            proven to significantly outperform standard fluoride toothpaste in
            occluding dentin tubules and treating hypersensitivity. In fact,
            data suggests that it takes 71 times more fluoride to produce the
            same remineralization effects as Rennou™. We work with many dental
            clinics around the world that trust in the power of Rennou™, and we
            have a wealth of scientific research to back up our claims. On this
            page, we invite dental practices to learn more about the clinical
            benefits of Rennou™ and to consider incorporating Theodent into
            their practice.
          </div>
          <div className="pages-p mt-3">
            For an overview of how Rennou™ works, please 
            <a href="/pages/technology" style={{fontStyle: 'italic'}}>
              click here
            </a>
          </div>
          <div className="pages-p mt-3">
            For a list of peer-reviewed studies on the effects of Rennou™ on the
            enamel, see below.
          </div>
          <div className="d-flex justify-content-center mt-5">
            <ClinicalForm />
          </div>
          <div className="pages-p mt-5">
            We encourage you to try Theodent toothpaste and give us your honest
            feedback. Many patients prefer not to use fluoride in their dental
            care routine, and our toothpaste is a great alternative for them. We
            are committed to constantly improving our products and advancing
            Rennou™ in the marketplace. With Theodent, you can trust that you
            are getting a high-quality and effective oral care solution.
          </div>
          <div className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3">
                <img
                  alt="Clinical study results - Rennou fluoride alternative effectiveness"
                  src="/imgs/clinicalImg1.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Scientific research on theobromine vs fluoride enamel remineralization"
                  src="/imgs/clinicalImg2.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Theodent clinical trial data on fluoride-free toothpaste efficacy"
                  src="/imgs/clinicalImg3.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Peer-reviewed studies on cacao-based fluoride alternative safety"
                  src="/imgs/clinicalImg4.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Research comparing fluoride alternatives for dental health"
                  src="/imgs/clinicalImg5.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Theodent Rennou technology effectiveness studies"
                  src="/imgs/clinicalImg6.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Safe fluoride alternative clinical evidence and research"
                  src="/imgs/clinicalImg7.png"
                  style={{width: '100%'}}
                />
              </div>
              <div className="col-6 col-md-3">
                <img
                  alt="Dental professional studies on fluoride-free toothpaste"
                  src="/imgs/clinicalImg8.png"
                  style={{width: '100%'}}
                />
              </div>
            </div>
          </div>
          <div
            className="theo-h2 mt-4 mb-3"
            style={{fontSize: 26, fontWeight: 600}}
          >
            Peer-Reviewed Studies on the Effects of Rennou™ on Enamel
          </div>

          {clinicalReferences?.map((cl, key) => (
            <div className="pages-p mt-2" key={key}>
              {cl}
            </div>
          ))}

          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const clinicalReferences = [
  'Amaechi, B.T., Mathews, S.M. and Mensinkai, P.K., 2015. Effect of theobromine-containing toothpaste on dentin tubule occlusion in situ. Clinical oral investigations, 19(1), pp.109-116.',
  'Amaechi, B.T., Porteous, N., Ramalingam, K., Mensinkai, P.K., Vasquez, R.C., and Nakamoto, T., 2013. Remineralization of artificial enamel lesions by theobromine. Caries Research, 47(5), pp.399-405.',
  'Chandak, S., Madhu, P.P., Chhabra, K.G., Reche, A., Mahure, G., Giri, S. and Chandak, M., Review on Theobromine: An Alternative to Fluorides in Treating Dentinal Hypersensitivity.',
  'Durhan, M.A., Bilsel, S.O., Gokkaya, B., Yildiz, P.K. and Kargul, B., 2021. Caries Preventive Effects of Theobromine Containing Toothpaste on Early Childhood Caries: Preliminary Results. Acta Stomatologica Croatica, 55(1).',
  'Elsherbini, M.S., 2020. Assessment of remineralization potential of Theobromine and Sodium Fluoride gels on Artificial Caries like lesions. Brazilian Dental Science, 23(3), pp.11-p.',
  'Golfeshan, F., Mosaddad, S.A. and Ghaderi, F., 2021. The Effect of Toothpastes Containing Natural Ingredients Such As Theobromine and Caffeine on Enamel Microhardness: An In Vitro Study. Evidence-Based Complementary and Alternative Medicine, 2021.',
  'Green, R., Lanphear, B., Hornung, R., Flora, D., Martinez-Mier, E.A., Neufeld, R., Ayotte, P., Muckle, G. and Till, C., 2019. Association between maternal fluoride exposure during pregnancy and IQ scores in offspring in Canada. JAMA pediatrics, 173(10), pp.940-948.',
  'Gündoğar, Z.U., Keskin, G. and Çinar, Ç., 2019. Comparison of fluoride and the novel anti-caries agent theobromine on initial enamel caries: an in vitro study. Fluoride, 52(3).',
  'Herisa, H.M., Noerdin, A. and Eriwati, Y.K., 2017, August. The effect of theobromine 200 mg/l topical gel exposure duration against surface enamel hardness resistance from 1% citric acid. In Journal of Physics: Conference Series (Vol. 884, No. 1, p. 012009). IOP Publishing.',
  'Hussein, S.I. and El-Haddad, K.E.S., 2018. COMPARISON BETWEEN SOLUTION AND GEL FORMS OF THEOBROMINE AND SODIUM FLUORIDE IN REMINERALIZATION OF THE DEMINERALIZED HUMAN ENAMEL (SEM and EDXA study). Egyptian Dental Journal, 64(3-July (Oral Medicine, X-Ray, Oral Biology & Oral Pathology)), pp.2371-2380.',
  'Irawan, M.I.P., Noerdin, A. and Eriwati, Y.K., 2017, August. The effect of time in the exposure of theobromine gel to enamel and surface hardness after demineralization with 1% citric acid. In Journal of Physics: Conference Series (Vol. 884, No. 1, p. 012005). IOP Publishing.',
  'Kargul, B., Özcan, M., Peker, S., Nakamoto, T., Simmons, W.B. and Falster, A.U., 2012. Evaluation of human enamel surfaces treated with theobromine: a pilot study. Oral Health and Preventive Dentistry, 10(3), p.275.',
  'Lakshmi, A., Vishnurekha, C. and Baghkomeh, P.N., 2019. Effect of theobromine in antimicrobial activity: An in vitro study. Dental research journal, 16(2), p.76.',
  'Nakamoto, T., Falster, A.U. and Simmons Jr, W.B., 2016. Theobromine: a safe and effective alternative for fluoride in dentifrices. Journal of caffeine research, 6(1), pp.1-9.',
  'Nakamoto, T., Falster, A.U. and Simmons Jr, W.B., 2022. The Contrasting Effects between Caffeine and Theobromine on Crystallization: How the Non-fluoride Dentifrice Was Developed. Oral Health Care: An Important Issue of the Modern Society, p.317.',
  'Shawky, R. and Khattab, N., 2021. Evaluation of the remineralizing effect of theobromine and fluoride using scanning electron microscope. Egyptian Dental Journal, 67(1-January (Orthodontics, Pediatric & Preventive Dentistry)), pp.119-126.',
  'Shimizu, S., Kusakabe, S., Toyama, M., Takagaki, T., Kitada, N., Yamamoto, K., Ikeda, M., Ichimura, Y., Burrow, M.F., Hotta, M. and Nikaido, T., 2023. Bacterial adhesion and antibacterial property of coating materials containing theobromine and S-PRG filler. Dental Materials Journal, pp.2021-307.',
  'Suryana, M., Irawan, B. and Soufyan, A., 2018, August. The effects of toothpastes containing theobromine and hydroxyapatite on enamel microhardness after immersion in carbonated drink. In Journal of Physics: Conference Series(Vol. 1073, No. 3, p. 032010). IOP Publishing.',
  'Syafira, G., Permatasari, R. and Wardani, N., 2012. Theobromine effects on enamel surface microhardness: in vitro. J Dent Indonesia, 19(2), pp.32-6.',
  'Taneja, V., Nekkanti, S., Gupta, K. and Hassija, J., 2019. Remineralization potential of theobromine on artificial carious lesions. Journal of International Society of Preventive & Community Dentistry, 9(6), p.576.',
  'Thomas, N.A., Shetty, P., Thimmaiah, C., Shetty, S.B., Sabu, N. and Kripalani, K.B., 2021. Comparative evaluation of the remineralization potential of Theobromine and Fluoride containing dentifrices using Scanning Electron Microscopy with Energy Dispersive X-Ray Analysis: An in-vitro Study. Journal of International Dental and Medical Research, 14(4), pp.1314-1320.',
  'Wulandari, N.Y., Irawan, B. and Herda, E., 2018, August. Effects of theobromine toothpaste on prevention of enamel discoloration from coffee. In Journal of Physics: Conference Series (Vol. 1073, No. 3, p. 032009). IOP Publishing.',
  'Yuanita, T., Setyabudi, S. and Adjani, Q.S., 2019. The effect of theobromine and NaF 2% exposure to enamel surface hardness after immersing in orange juice beverage. Conservative Dentistry Journal, 9(2), pp.70-73.',
];

const ingredientList = [
  {
    name: 'Aqua/Water/Eau',
    desc: 'serves as the primary vehicle for all other ingredients.',
  },
  {
    name: 'Hydrated Silica',
    desc: 'acts as a thickening agent, a mild abrasive, and a whitening agent.',
  },
  {
    name: 'Xylitol',
    desc: 'acts as a mild sweetener, and helps prevent bacterial growth on the enamel.',
  },
  {name: 'Sorbitol', desc: 'acts as a thickening agent and flavor enhancer.'},
  {name: 'Glycerin', desc: 'helps retain moisture and improve mouth-feel.'},
];

const ingredientList2 = [
  {
    name: 'Sodium Lauroyl Sarcosinate',
    desc: 'acts as a foaming agent and detergent, a safer alternative to SLS (sodium lauryl sulfate).',
  },
  {
    name: 'Xanthan Gum',
    desc: 'a thickening agent, emulsifier, and stabilizer.',
  },
  {
    name: 'Titanium Dioxide',
    desc: 'used in small concentrations to improve the color of the paste.',
  },
  {
    name: 'Citric Acid',
    desc: 'used to stabilize the formulation, and enhance flavor.',
  },
  {
    name: 'Sodium Bicarbonate',
    desc: 'used as a mild abrasive to remove plaque.',
  },
  {
    name: 'Sodium Benzoate',
    desc: 'used as a preservative to prevent microbial growth in the tube.',
  },
  {name: 'Stevioside', desc: '(stevia) used as a plant-based sweetener.'},
  {
    name: 'Mentha Viridis (Spearmint) Leaf Oil',
    desc: 'gives the formula a refreshing spearmint flavor. This is used in both Theodent Classic and Theodent 300. ',
  },
  {
    name: 'Natural Flavor/Aroma (Chocolate)',
    desc: 'gives the Theodent Kids toothpaste its signature chocolate flavor that kids love.',
  },
  {
    name: 'Vanilla Planifolia Flower Extract',
    desc: 'used in a small amount to improve the overall flavor.',
  },
];

const IngredientsPage = () => {
  return (
    <>
      <PageHeader
        imgPath="/imgs/blackFridayBanner2.png"
        title={`The Ingredients`}
      />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920}} className="">
          <div className="pages-p mt-3">
            To produce the most premium toothpaste in the world, it all starts
            with the ingredients. Each ingredient in our toothpaste is carefully
            selected to serve a unique purpose for our formulation. Prior to
            each production, there are multiple layers of quality control tests
            to ensure that each ingredient that goes into your tube is of the
            highest grade possible. Theodent is committed to evolving our
            formulation to meet global health standards, and the needs of
            clinicians and our customers worldwide.
          </div>
          <div className="pages-p mt-3">
            <span style={{fontWeight: 600}}>Rennou™</span> - the active
            ingredient that serves as a direct replacement for fluoride, Rennou™
            promotes rapid remineralization of tooth enamel on contact. It is a
            carefully calculated formulation of Theobromine, Calcium, and
            Phosphate. Unlike fluoride, Rennou™ is entirely non-toxic and safe
            if swallowed.
          </div>

          <div className="row">
            <div className="col-12 col-md-9">
              <div className="col-12 d-block d-md-none d-flex justify-content-center mt-3">
                <img alt="Rennou patented fluoride alternative technology logo" src="/imgs/rennouLogo.png" style={{width: '70%'}} />
              </div>
              {ingredientList?.map((ing, key) => (
                <div key={key} className="d-flex mt-4 pages-p">
                  <div>
                    <span style={{fontWeight: 600}}>{ing?.name}</span> -{' '}
                    {ing?.desc}
                  </div>
                </div>
              ))}
            </div>
            <div className="col-3 d-none d-md-block">
              <img alt="Rennou patented fluoride alternative technology logo" src="/imgs/rennouLogo.png" style={{width: '100%'}} />
            </div>
          </div>

          {ingredientList2?.map((ing, key) => (
            <div key={key} className="d-flex mt-4 pages-p">
              <div>
                <span style={{fontWeight: 600}}>{ing?.name}</span> - {ing?.desc}
              </div>
            </div>
          ))}

          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

//          <ContactForm />
const ContactPage = () => {
  return (
    <>
      <PageHeader imgPath="/imgs/contactBanner.webp" title={`The Contact`} />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920}} className="">
          <div className="pages-p mt-3">
            Our mission is to provide the world with a safe alternative to
            fluoride that includes a superior oral care experience from start to
            finish. We will never stop innovating when it comes to your dental
            health, and we welcome your feedback as our team continually
            improves each product. If you have any thoughts on how we can offer
            an even better experience or any questions about Theodent, we would
            love to hear from you.
          </div>
          <div style={{fontWeight: 600}} className="pages-p mt-3">
            Phone Number:
          </div>
          <a href="tel:+15042645050" className="pages-p">
            +1.504.264.5050
          </a>
          <div style={{fontWeight: 600}} className="pages-p mt-3">
            Address:
          </div>
          <div className="pages-p">
            Theodent, LLC, 1441 Canal Street, New Orleans, Louisiana 70112,
            United States
          </div>
          <div style={{fontWeight: 600}} className="pages-p mt-3">
            Email Enquiries:
          </div>
          <a href="mailto:info@theo-corp.com" className="pages-p">
            info@theo-corp.com
          </a>
          <div style={{fontWeight: 600}} className="pages-p mt-5">
            Write Us
          </div>
          <ContactForm />
          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const ShippingNReturnsPage = () => {
  return (
    <>
      <PageHeader
        imgPath="/imgs/contactBanner.webp"
        title={`Shipping & Returns`}
      />
      <div className="container d-flex justify-content-center align-items-start">
        <div style={{maxWidth: 920}} className="mt-3 mt-md-5">
          <div className="pages-h2 mt-4">Domestic Shipping (United States)</div>
          <div className="pages-p mt-3">
            Theodent ships within the United States, and once an order is
            placed, we typically ship within 3-5 business days. Customers can
            select from several shipping options at checkout, with standard and
            expedited service available.
          </div>

          <div className="pages-h2 mt-4">International Shipping</div>
          <div className="pages-p mt-3">
            Theodent is equipped to ship products to virtually any country in
            the world. Please note that Theodent is not responsible for any
            additional customs or import duties charged on delivery, and the
            recipient is responsible for paying any such charges. Delivery times
            may vary, and Theodent cannot guarantee specific delivery dates for
            international shipments. By placing an international order, the
            customer agrees to these terms and conditions.
          </div>

          <div className="pages-h2 mt-4">Return Policy</div>
          <div className="pages-p mt-3">
            At Theodent, we want you to be delighted with your purchase. If you
            are not, you may return any unopened and unused product in its
            original condition within 30 days of receipt for a full refund. Any
            product that has been opened is not eligible for return. To initiate
            a return, please get in touch with us at info@theo-corp.com for
            return instructions. Please note that we cannot refund shipping and
            handling fees, and we will process your refund within 5-7 business
            days after receipt of the returned product. Please note that
            International Orders are not eligible for returns.{' '}
          </div>

          <FooterBtns />
          <IconBar border={false} />
        </div>
      </div>
    </>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-start">
      <div style={{maxWidth: 920}} className="mt-3 mt-md-5">
        <div className="pages-h1">Privacy Policy</div>

        <div className="pages-p mt-3">
          The policies below are applicable to this website. Theodent™ does not
          collect personal information through this website. Registration is
          required and information is collected in certain portions of the web
          site in which guests specifically and knowingly provide such
          information along with content submission. Theodent™ may use such
          information to track compliance with our website terms of use, or for
          editorial and feedback purposes (to the extent that is explained when
          guests provide the information).
        </div>

        <div className="pages-h2 mt-4">Policies for Individuals</div>
        <div className="pages-p mt-3">
          Unless otherwise disclosed during collection, Theodent™ does not
          provide any personally identifying information, regardless of its
          source, to any third party for any purpose whatsoever. Guests' e-mail
          addresses are never posted on our website unless the guest chooses to
          make their e-mail address viewable to the public.
        </div>

        <div className="pages-h2 mt-4">About IP Addresses</div>
        <div className="pages-p mt-3">
          We may collect IP addresses for the purposes of system administration
          and generating statistics. An IP address is a number that's
          automatically assigned to your computer by your ISP whenever you're
          connected to a network or connected to the Internet. When guests
          request pages from NOLAPCWorks.com, our web servers log the guests' IP
          addresses. We do not link IP addresses to anything personally
          identifiable. This means that a user's session will be logged, but the
          user remains anonymous to us unless issues of security arise in which
          IP addresses may be turned over to local, state and national
          authorities.
        </div>

        <div className="pages-h2 mt-4">Use of Cookies</div>
        <div className="pages-p mt-3">
          What are cookies? Cookies are pieces of information that a website
          transfers to an individual's hard drive for record keeping purposes.
          Cookies make Web-surfing easier for you by saving your passwords,
          purchases, and preferences while you're at our site. The use of
          cookies is an Industry standard, and you'll find cookies at most major
          websites. Theodent™ never uses cookies to retrieve information from
          your computer that was not originally sent in a cookie. Except as
          described below, Theodent™ does not use information transferred
          through cookies for any promotional or marketing purposes, nor is that
          information shared with any third parties whatsoever.
        </div>

        <div className="pages-h2 mt-4">Links to Other Sites</div>
        <div className="pages-p mt-3">
          Users should be aware that when you are on Theodent™ website you could
          be directed to other sites that are beyond our control. There are
          links to other sites from Theodent™ that take you outside of our
          service. For example, this includes news updates, articles, and RSS
          feeds that link to other online publications and websites that may
          send their own cookies to users, collect data or solicit personal
          information. While we strive to protect our user's personal
          information and privacy, we cannot guarantee the security of any
          information you disclose online and you do so at your own risk.
        </div>

        <div className="pages-h2 mt-4">Security Policy</div>
        <div className="pages-p mt-3">
          The importance of security for all personally identifiable information
          associated with our Guests is of utmost concern to us. We exercise
          great care in providing secure transmission of your information from
          your PC to our servers, utilizing encryption software. Only these
          employees who need to access to your information in order to do their
          jobs are allowed access, each having signed compressive nondisclosure
          agreements, which provides explicit legal confidentiality protections.
          Any employee who violates our privacy and/or security policies is
          subject to disciplinary action, including possible termination and
          civil and/or criminal prosecution.
        </div>

        <div className="pages-h2 mt-4">Your Acceptance of These Terms</div>
        <div className="pages-p mt-3">
          By using this site, you signify your assent to the Theodent™ Privacy
          Policy. If you do not agree to this policy, please do not use our
          site. Your continued used of the Theodent™ site following the posting
          of changes to these terms will mean you accept those changes. You can
          send an e-mail for further questions.
        </div>

        <FooterBtns />
        <IconBar border={false} />
      </div>
    </div>
  );
};
