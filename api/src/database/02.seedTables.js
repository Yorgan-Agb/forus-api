import { User, Post, Category, Comment } from "../models/associations.js";
import { sequelize } from "../database/sequelize-client.js";
import argon2 from "argon2";
import { auth } from "express-oauth2-jwt-bearer";

seedDatabase();

async function seedDatabase() {
  console.log("🔄 O-ddlt seeding started...");

  try {
    await sequelize.sync({ force: true }); //Supprime et recrée les tables

    // Créer les catégories
    console.log("📂 Creating categories...");
    const sciences = await Category.create({ category_name: "Sciences" });
    const technologie = await Category.create({ category_name: "Technologie" });
    const arts = await Category.create({ category_name: "Arts" });
    const medecine = await Category.create({ category_name: "Médecine" });
    const sport = await Category.create({ category_name: "Sport" });

    // 2. Créer des utilisateurs
    console.log("👥 Creating users...");
    const alice = await User.create({
      auth0_id: "auth0|68fa9cd68fb878d86bf64a7c",
      firstname: "Alice",
      lastname: "Dupont",
      email: "test@test.com",
      password: await argon2.hash("password123"),
      pseudo: "alice_dev",
    });

    const bob = await User.create({
      auth0_id: "auth0|bob456",
      firstname: "Bob",
      lastname: "Martin",
      email: "bob@example.com",
      password: await argon2.hash("password456"),
      pseudo: "bob_tech",
    });

    const charlie = await User.create({
      auth0_id: "auth0|charlie789",
      firstname: "Charlie",
      lastname: "Durand",
      email: "charlie@example.com",
      password: await argon2.hash("password789"),
      pseudo: "charlie_art",
    });

    // Créer des posts
    console.log("📝 Creating posts...");
    const post1 = await Post.create({
      post: "La relativité générale explique comment la gravité déforme l'espace-temps. C'est fascinant !",
      date: new Date(),
      user_id: alice.userId,
      category_id: sciences.categoryId,
    });

    const post2 = await Post.create({
      post: "JavaScript ou TypeScript pour un projet backend ? Qu'en pensez-vous ?",
      date: new Date(),
      user_id: bob.userId,
      category_id: technologie.categoryId,
    });

    const post3 = await Post.create({
      post: "Les techniques de peinture impressionniste sont vraiment incroyables. Monet reste mon préféré.",
      date: new Date(),
      user_id: charlie.userId,
      category_id: arts.categoryId,
    });

    const post4 = await Post.create({
      post: "Les avancées en immunothérapie pour le traitement du cancer sont prometteuses.",
      date: new Date(),
      user_id: alice.userId,
      category_id: medecine.categoryId,
    });

    const post5 = await Post.create({
      post: "Qui a regardé le match hier soir ? Quelle performance !",
      date: new Date(),
      user_id: bob.userId,
      category_id: sport.categoryId,
    });

    // Créer des commentaires
    console.log("💬 Creating comments...");
    await Comment.create({
      comment:
        "Très intéressant ! J'aimerais en savoir plus sur la courbure de l'espace-temps.",
      user_id: bob.userId,
      post_id: post1.postId,
    });

    await Comment.create({
      comment: "Einstein était vraiment un génie.",
      user_id: charlie.userId,
      post_id: post1.postId,
    });

    await Comment.create({
      comment:
        "TypeScript pour moi ! Le typage statique évite beaucoup d'erreurs.",
      user_id: alice.userId,
      post_id: post2.postId,
    });

    await Comment.create({
      comment: "JavaScript reste plus flexible selon moi.",
      user_id: charlie.userId,
      post_id: post2.postId,
    });

    await Comment.create({
      comment: "Monet c'est magnifique ! Tu as visité son jardin à Giverny ?",
      user_id: bob.userId,
      post_id: post3.postId,
    });

    await Comment.create({
      comment: "Super article ! L'immunothérapie va révolutionner la médecine.",
      user_id: charlie.userId,
      post_id: post4.postId,
    });

    await Comment.create({
      comment: "Oui ! Le dernier but était incroyable !",
      user_id: alice.userId,
      post_id: post5.postId,
    });

    console.log("✅ O-ddlt seed done with success!");
    console.log(`📊 Created:
    - ${await Category.count()} categories
    - ${await User.count()} users
    - ${await Post.count()} posts
    - ${await Comment.count()} comments`);
  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    console.log("🧹 Clean up by closing database connection");
    await sequelize.close();
  }
}
