const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const {createConnection} = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'لطفا نام را وارد کنید']
    },
    firstName: {
        type: String,
        require: [true, 'لطفا نام خوانوادگی را وارد کنید']
    },
    email: {
        type: String,
        require: [true, 'لطفا ایمیل را وارد کنید'],
        lowercase: true,
        validate: [validator.isEmail, 'لطفا یک ایمیل معتبر وارد کنید']
    },
    password: {
        type: String,
        require: [true, 'لطفا یک پسورد معتبر وارد کنید'],
        minlength: 8,
        select: false
    },
    passwordConfrim: {
        type: String,
        require: [true, 'لطفا رمز عبور خود را تایید کنید'],
        validate: {
            // this only works on create and save !!
            validator: function (el) {
                return el === this.password;
            },
            message: 'رمزهای عبور یکسان نیستند!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

//
// userSchema.pre('save', async function (next) {
//     //only run this function if password was actually modified
//     if (!this.isModified('password')) return next();
//
//     // Hash the password with cost of 12
//     this.password = await bcrypt.has(this.password, 12);
//
//     //delete passwordConfrim field
//     this.passwordConfrim = undefined;
//     next();
//
// })
//
//
// userSchema.pre('save', function (next) {
//     if (!this.isModified('password') || this.isNew) return next();
//
//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// })
//
// userSchema.pre(/^find/, function (next)
// {
//     // this points to the current query
//     this.find({active: {$ne: false}});
//     next();
// })
//
// userSchema.methods.correctPassword = async function (
//     candidatePassword,
//     userPassword
// ) {
//     return await bcrypt.compare(candidatePassword, userPassword)
// }
//
//
// userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
//     if (this.passwordChangedAt) {
//         const changedTimestamp = parseInt(
//             this.passwordChangedAt.getTime() / 1000, 10
//         );
//
//         return JWTTimestamp < changedTimestamp;
//     }
//
//     // false means not changed
// }
//
//
// userSchema.methods.createPasswordResetToken = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//
//     this.passwordResetToken = crypto
//         .createHash('sha256')
//         .update(resetToken)
//         .digest('hex')
//
//
//     console.log({resetToken}, this.passwordResetToken);
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//
//     return resetToken;
// }
//

const User = mongoose.model('User',userSchema);
module.exports =User;