import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

ImageSchema.index({ uploadedBy: 1 });
ImageSchema.index({ publicId: 1 }, { unique: true });

const Image = mongoose.model('Image', ImageSchema);

export default Image;
