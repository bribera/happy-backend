'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // ⚠️ exécute seulement si aucun cours n'existe
    const existing = await strapi.db.query("api::cours-formation.cours-formation").count();
    if (existing > 0) return;

   // ✅ Vérifier si la catégorie "Languages" existe déjà
    let category = await strapi.db.query("api::categorie.categorie").findOne({
      where: { slug: "languages" },
    });

    if (!category) {
      category = await strapi.entityService.create("api::categorie.categorie", {
        data: { name: "Languages", slug: "languages" },
      });
    }

    const course = await strapi.entityService.create("api::cours-formation.cours-formation", {
      data: {
        titre: "English – Beginner",
        slug: "english-beginner",
        description: "First steps in English",
        categorie: category.id,
        langue_cours: "Anglais",
        niveau: "Débutant",
        prix: 60000,
        date_debut: "2025-07-01",
        dure: "8 weeks",
        locale: "fr",
      },
    });

    await strapi.entityService.create("api::calendrier-academique.calendrier-academique", {
      data: {
        course: course.id,
        date_debut: "2025-07-01",
        date_fin: "2025-08-26",
      },
    });
        console.log("✅ Données de démarrage créées avec succès.");
  },
};
