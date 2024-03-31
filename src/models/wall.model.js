import mongoose from "mongoose";

const wallSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    aspecRatio: {
        type: Number,
        required: true
    }
 },
 {timestamps: true}
)

export default mongoose.model('wallpapers', wallSchema)