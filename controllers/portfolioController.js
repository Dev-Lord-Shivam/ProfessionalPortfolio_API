import Portfolio from '../models/Portfolio.js';
import { DEFAULT_PORTFOLIO } from '../utils/seed.js';
import { v2 as cloudinary } from 'cloudinary'

/**
 * GET /api/portfolio
 * Fetch the full portfolio document from MongoDB.
 * PUBLIC — no token required.
 */
export const getPortfolio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create(DEFAULT_PORTFOLIO);
    }
    return res.status(200).json(portfolio);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/portfolio
 * Update / replace the portfolio document in MongoDB.
 * PROTECTED — requires valid JWT token (admin only).
 */
// export const updatePortfolio = async (req, res) => {
//   try {
//     let portfolio = await Portfolio.findOne();
//     if (!portfolio) {
//       portfolio = new Portfolio(req.body);
//     } else {
//       Object.assign(portfolio, req.body);
//     }
//     await portfolio.save();
//     return res.json({
//       success: true,
//       message: 'Portfolio sync completed successfully!',
//       data: portfolio,
//     });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

export const updatePortfolio = async (req, res) => {
  try {
    const body = req.body;

    let portfolio = await Portfolio.findOne();

    /*
    =========================================
    USER PROFILE PIC
    =========================================
    */

    if (body.user?.profilePic &&
      body.user.profilePic.url &&
      body.user.profilePic.url.startsWith('data:image')
    ) {
      // delete old image
      if (portfolio?.user?.profilePic?.public_id) {
        await cloudinary.uploader.destroy(
          portfolio.user.profilePic.public_id
        );
      }

      // upload new image
      const uploaded = await cloudinary.uploader.upload(
        body.user.profilePic.url,
        {
          folder: 'portfolio/user',
        }
      );

      body.user.profilePic = {
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
        active: true,
      };
    }

    /*
    =========================================
    ABOUT IMAGES
    =========================================
    */

    if (body.about?.images?.length) {
      const uploadedImages = [];

      for (const image of body.about.images) {
        // image is an object: { url, public_id, active }
        const imageUrl = typeof image === 'string' ? image : image?.url;
        const isBase64 = imageUrl && imageUrl.startsWith('data:image');

        if (isBase64) {
          // New upload: upload to Cloudinary
          const uploaded = await cloudinary.uploader.upload(imageUrl, {
            folder: 'portfolio/about',
          });

          uploadedImages.push({
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
            active: image?.active !== false,
          });
        } else if (imageUrl) {
          // Already-uploaded image: preserve as-is
          uploadedImages.push({
            url: imageUrl,
            public_id: image?.public_id || '',
            active: image?.active !== false,
          });
        }
      }

      // Delete Cloudinary images that were removed by the user
      if (portfolio?.about?.images?.length) {
        const keptPublicIds = new Set(uploadedImages.map(img => img.public_id).filter(Boolean));
        for (const oldImage of portfolio.about.images) {
          if (oldImage.public_id && !keptPublicIds.has(oldImage.public_id)) {
            await cloudinary.uploader.destroy(oldImage.public_id);
          }
        }
      }

      body.about.images = uploadedImages;
    }


    /*
    =========================================
    EXPERIENCE LOGOS
    =========================================
    */

    if (body.experiences?.length) {
      for (let i = 0; i < body.experiences.length; i++) {
        const exp = body.experiences[i];

        if (
          exp.logo &&
          typeof exp.logo === 'string' &&
          exp.logo.startsWith('data:image')
        ) {
          // delete old logo
          if (
            portfolio?.experiences?.[i]?.logo?.public_id
          ) {
            await cloudinary.uploader.destroy(
              portfolio.experiences[i].logo.public_id
            );
          }

          // upload new logo
          const uploaded = await cloudinary.uploader.upload(
            exp.logo,
            {
              folder: 'portfolio/experience',
            }
          );

          exp.logo = {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
          };
        }
      }
    }

    /*
    =========================================
    PROJECT IMAGES
    =========================================
    */

    if (body.projects?.length) {
      for (let i = 0; i < body.projects.length; i++) {
        const project = body.projects[i];
        const uploadedProjectImages = [];

        for (const image of project.images || []) {
          const imageUrl = typeof image === 'string' ? image : image?.url;
          const isBase64 = imageUrl && imageUrl.startsWith('data:image');

          if (isBase64) {
            // New image — upload to Cloudinary
            const uploaded = await cloudinary.uploader.upload(imageUrl, {
              folder: 'portfolio/projects',
            });
            uploadedProjectImages.push({
              url: uploaded.secure_url,
              public_id: uploaded.public_id,
              active: image?.active !== false,
            });
          } else if (imageUrl) {
            // Already uploaded — preserve as-is
            uploadedProjectImages.push({
              url: imageUrl,
              public_id: image?.public_id || '',
              active: image?.active !== false,
            });
          }
        }

        // Only delete Cloudinary images that were actually removed
        if (portfolio?.projects?.[i]?.images?.length) {
          const keptIds = new Set(
            uploadedProjectImages.map(img => img.public_id).filter(Boolean)
          );
          for (const oldImg of portfolio.projects[i].images) {
            if (oldImg.public_id && !keptIds.has(oldImg.public_id)) {
              await cloudinary.uploader.destroy(oldImg.public_id);
            }
          }
        }

        project.images = uploadedProjectImages;
      }
    }

    /*
    =========================================
    TESTIMONIALS IMAGES
    =========================================
    */

    if (body.testimonials?.length) {
      for (let i = 0; i < body.testimonials.length; i++) {
        const testimonial = body.testimonials[i];

        if (
          testimonial.image &&
          typeof testimonial.image === 'object' &&
          testimonial.image.url &&
          testimonial.image.url.startsWith('data:image')
        ) {
          // Delete old image
          if (portfolio?.testimonials?.[i]?.image?.public_id) {
            await cloudinary.uploader.destroy(
              portfolio.testimonials[i].image.public_id
            );
          }

          // Upload new image
          const uploaded = await cloudinary.uploader.upload(
            testimonial.image.url,
            {
              folder: 'portfolio/testimonials',
            }
          );

          testimonial.image = {
            url: uploaded.secure_url,
            public_id: uploaded.public_id,
            active: testimonial.image.active !== false,
          };
        }
      }
    }

    /*
    =========================================
    SAVE DATA
    =========================================
    */
    if (!portfolio) {
      portfolio = new Portfolio(body);
      await portfolio.save();
    } else {
      portfolio = await Portfolio.findOneAndUpdate(
        { _id: portfolio._id },
        { $set: body },
        {
          new: true,           // return updated doc
          runValidators: true, // run schema validators
        }
      );
    }
    // if (!portfolio) {
    //   portfolio = new Portfolio(body);
    // } else {
    //   portfolio.set(body);
    //   portfolio.markModified('user');
    //   portfolio.markModified('about');
    //   portfolio.markModified('home');
    //   portfolio.markModified('projects');
    // }

    await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Portfolio sync completed successfully!',
      data: portfolio,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};