import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const certificateSchema = new mongoose.Schema(
  {
    name: String,
    issuer: String,
    issueDate: Date,
    expirationDate: Date,
    credentialId: String,
    credentialUrl: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const PortfolioSchema = new mongoose.Schema(
  {
    user: {
      name: String,
      profilePic: ImageSchema,
      exp: Number,
      currentCompany: String,
      currentPosition: String,
      openForWork: Boolean,
    },

    home: {
      welcomeText: String,
      intro: String,
      subtitle: String,
      rotatingTexts: [String],
      description: String,
      resumeUrl: String,
      projectUrl: String,

      socials: [
        {
          label: String,
          iconName: String,
          color: String,
          link: String,
          active: Boolean,
        },
      ],
    },

    about: {
      title: String,
      bio: String,
      beyondTitle: String,
      beyondBio: String,

      stats: [
        {
          iconName: String,
          label: String,
          value: String,
          active: {
            type: Boolean,
            default: true,
          },
        },
      ],

      images: [ImageSchema],
    },

    experiences: [
      {
        company: String,
        logo: ImageSchema,
        location: String,
        duration: String,
        roles: [
          {
            title: String,
            period: String,
            jobType: String,
            description: [String],
            techStack: [String],
            certifications: [certificateSchema],
            active: {
              type: Boolean,
              default: true,
            },
          },
        ],
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],

    projects: [
      {
        id: Number,
        title: String,
        description: String,
        images: [ImageSchema],
        techStack: [String],
        githubLink: String,
        liveLink: String,
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],

    skills: [
      {
        title: String,
        iconName: String,
        skills: [
          {
            name: String,
            icon: String,
          },
        ],

        color: String,
      },
    ],
    services: [
      {
        title: String,
        description: String,
        iconName: String,
        techStack: [String],
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
    testimonials: [
      {
        name: String,
        image: ImageSchema,
        role: String,
        quote: String,
        active: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

export default Portfolio;