import { Category } from './category.model.js';
import { Comment } from './comment.model.js';
import { Post } from './post.model.js';
import { User } from './user.model.js';
import { sequelize } from '../database/sequelize-client.js';

User.hasMany(Post, {
  as: 'posts',
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  as: 'comments',
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});

Post.belongsTo(Category, {
  as: 'category',
  foreignKey: 'category_id',
});

Post.hasMany(Comment, {
  as: 'comments',
  foreignKey: 'post_id',
});

Category.hasMany(Post, {
  as: 'posts',
  foreignKey: 'category_id',
});

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
});
Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: 'post_id',
});

export { User, Post, Category, Comment, sequelize };
