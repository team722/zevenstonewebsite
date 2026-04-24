export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id, title,
    "category": coalesce(category->label, category),
    publishedAt,
    "slug": slug.current,
    excerpt,
    readTime,
    "imageUrl": mainImage.asset->url,
    "mainImage": mainImage { alt, "url": asset->url },
    "authorName": author->name,
    "authorPhoto": author->photo.asset->url,
    featured
  }
`;

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title,
    "category": coalesce(category->label, category),
    "categoryId": category._ref,
    publishedAt, excerpt, readTime,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "mainImage": mainImage { alt, caption, "url": asset->url },
    showTableOfContents,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        alt, caption
      },
      _type == "stepsBlock" => {
        heading,
        steps[] {
          title, description,
          "iconUrl": icon.asset->url
        }
      }
    },
    ctaBanner { heading, description, buttonText, buttonUrl },
    seo,
    "author": author->{
      name, role, linkedIn, twitter, facebook, instagram,
      "photoUrl": photo.asset->url
    }
  }
`;

export const RELATED_POSTS_QUERY = `
  *[
    _type == "blogPost" &&
    category._ref == $categoryId &&
    _id != $currentId
  ] | order(publishedAt desc) [0...3] {
    _id, title, excerpt,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    "category": coalesce(category->label, category),
    publishedAt
  }
`;

export const TEAM_MEMBERS_QUERY = `
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id, name, role,
    "photoUrl": photo.asset->url,
    bio, linkedIn
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(displayOrder asc) {
    _id, content, author, role, company,
    "photoUrl": photo.asset->url
  }
`;

export const PORTFOLIO_PROJECTS_QUERY = `
  *[_type == "portfolioProject"] | order(displayOrder asc) {
    _id, client, headline, "category": coalesce(category->label, category),
    tags,
    "imageUrl": image.asset->url
  }
`;

export const PORTFOLIO_CATEGORIES_QUERY = `
  *[_type == "portfolioCategory"] | order(displayOrder asc) {
    _id, label, value
  }
`;

export const SERVICES_QUERY = `
  *[_type == "service"] | order(displayOrder asc) {
    _id, title, description, details, "slug": slug.current,
    "imageUrl": image.asset->url,
    isFeatured
  }
`;

export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] {
    _id, client, headline, challenge, solution, impact, tags, "slug": slug.current,
    "imageUrl": image.asset->url
  }
`;

export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && (slug.current == $slug || _id == $slug)][0] {
    _id, client, headline, "slug": slug.current,
    "imageUrl": image.asset->url,
    challenge, solution, impact, tags,
    keyResults, servicesProvided, 
    "processImagesUrls": processImages[].asset->url,
    solutionFeatures,
    seo
  }
`;

export const FAQS_QUERY = `
  *[_type == "faqItem"] | order(displayOrder asc) {
    _id, question, answer
  }
`;

export const HOME_PAGE_QUERY = `
  *[_type == "homePage"][0] {
    hero { heading, subheading, description,label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton, secondaryCtaButton },
    visionSection { heading, description, "imageUrl": image.asset->url, button, ctaButton },
    servicesHeading { heading, description },
    testimonialsHeading { heading, description },
    whyChooseUsHeading { heading, description },
    partnersHeading {heading},
    portfolioHeading { heading, description },
    faqHeading { heading, description },
    contactFormSection { heading, description },
    stats, whyUsItems, processSteps, moreServicesTags,
    founderMessages[] {
      title, content, author, role, "photoUrl": photo.asset->url
    },
    seo
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url,
    navigation[] { text, url },
    headerCta { text, url },
    footerDescription,
    footerNavigation[] { text, url },
    footerServices[] { text, url },
    legalLinks[] { text, url },
    copyrightText,
    partnerLogos[]{ name, "logoUrl": logo.asset->url },
    coreValues, contactEmail, phoneNumber, address, linkedIn, instagram, facebook
  }
`;

export const ABOUT_PAGE_QUERY = `
  *[_type == "aboutPage"][0] { 
    hero { heading, subheading, description,label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton },
    "heroImagesUrl": heroImages[].asset->url,
    visionSection { heading, description },
    missionSection { heading, description },
    howWeWorkHeading { heading, description },
    coreValuesHeading { heading, description },
    foundersBioHeading { heading, description },
    teamHeading { heading, description },
    testimonialsHeading { heading, description },
    seo 
  }
`;

export const FOUNDERS_BIO_QUERY = `
  *[_type == "founderBio"] | order(displayOrder asc) {
    _id, name, role, tagline,
    "photoUrl": photo.asset->url,
    quoteText, theStory, theJourney, theVision,
    notableAchievements, beyondWork
  }
`;

export const SERVICES_PAGE_QUERY = `
  *[_type == "servicesPage"][0] { 
    hero { heading, subheading, description, label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton },
    notSureWhereToStartCta { heading, description, button },
    pillarsHeading { heading, description },
    servicesGridHeading { heading, description },
    techStackHeading { heading, description },
    processSteps,
    seo,
    positioningIntro { heading, description, positioningLine },
    problemSection { heading, items, closingLine },
    pillars[] { pillarNumber, title, description, capabilities },
    aiLayerSection { heading, items, closingLine },
    howItWorksSection { heading, steps[]{ stepLabel, description } },
    whoWeWorkWithSection { heading, partnerTypes, idealPartnerDescription },
    resultsSection { heading, outcomes },
    partnershipModelsSection { heading, subheading, models[]{ title, description } },
    whatSetsUsApartSection { heading, points, closingLine },
    serviceArchitectureTags,
    bookStrategyCallCta { heading, description, button { text, url } }
  }
`;

export const PORTFOLIO_PAGE_QUERY = `
  *[_type == "portfolioPage"][0] { 
    hero { heading, subheading, description,label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton },
    likeWhatYouSeeCta { heading, description, button },
    seo 
  }
`;

export const SUCCESS_STORIES_PAGE_QUERY = `
  *[_type == "successStoriesPage"][0] { 
    hero { heading, subheading, description,label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton },
    readyToWriteCta { heading, description, button },
    storiesHeading { heading, description },
    seo 
  }
`;

export const BLOG_PAGE_QUERY = `
  *[_type == "blogPage"][0] { 
    hero { heading, subheading, description, label, "backgroundImageUrl": backgroundImage.asset->url, ctaButton },
    stayAheadCta { heading, description, button },
    defaultCtaBanner { heading, description, buttonText, buttonUrl },
    newsletterSection { heading, description, buttonText, placeholder },
    seo 
  }
`;

export const CONTACT_PAGE_QUERY = `
  *[_type == "contactPage"][0] {
    contactHeader { heading, description },
    seo
  }
`;

export const LANDING_PAGE_QUERY = `
  *[_type == "landingPage" && slug.current == $slug][0] {
    title, "slug": slug.current,
    pageBlocks[] {
      ...,
      _type == "hero" => {
        headline, subheadline, ctaLabel, ctaUrl, backgroundImage
      },
      _type == "servicesFeatures" => {
        sectionTitle, items
      },
      _type == "testimonialsSection" => {
        sectionTitle,
        testimonials[]->{
          _id, content, author, role, company, photo
        }
      },
      _type == "ctaBanner" => {
        headline, buttonLabel, buttonUrl, backgroundColor
      },
      _type == "statsSection" => {
        stats
      }
    },
    seo
  }
`;

export const SINGLE_SERVICE_QUERY = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, description,label,ctaButton, secondaryCtaButton,
    "imageUrl": image.asset->url,
    hero {
      title, subtitle, stats[]{value, label},
      "trustedLogosUrls": trustedLogos[].asset->url
    },
    featuredVideo {
      title, description, videoUrl, "thumbnailUrl": thumbnail.asset->url
    },
    benefits {
      title, benefitsList[]{"icon": icon.asset->url, title, description}
    },
    process {
      title, subtitle, steps[]{title, description}
    },
    portfolio {
      title, examples[]{title, category, objective, result, videoUrl, "thumbnailUrl": thumbnail.asset->url}
    },
    metrics {
      title, list[]{value, label}
    },
    features {
      title,subtitle,list[]{title,subTitle,inclusions}
    },
    testimonials {
      title, list[]{rating, quote, author, company}
    },
    engagement {
      title, subtitle,cardTitle, description, ctaText, ctaUrl
    },
    faqs {
      title,description, list[]{question, answer}
    },
    bottomCta {
      title, subtitle, buttonText, buttonUrl, note
    }
  }
`;
