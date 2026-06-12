import { defineCollection, z } from 'astro:content';

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    date:         z.coerce.date(),
    description:  z.string(),
    status:       z.enum(['draft', 'published', 'archived']).default('draft'),
    featured:     z.boolean().default(false),
    external_url: z.string().url().optional(),
    tags:         z.array(z.string()).default([]),
  }),
});

const dossier = defineCollection({
  type: 'data',
  schema: z.object({
    profile: z.object({
      name:   z.string(),
      role:   z.string(),
      bio_p1: z.string(),
      bio_p2: z.string(),
    }),
    credentials: z.array(z.object({
      year:        z.string(),
      degree:      z.string(),
      institution: z.string(),
      field:       z.string(),
    })),
    competencies: z.array(z.object({
      title: z.string(),
      items: z.array(z.string()),
    })),
    outputs: z.array(z.object({
      year:  z.string(),
      title: z.string(),
      role:  z.string(),
      url:   z.string().url().optional(),
    })),
  }),
});

export const collections = { insights, dossier };
