import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'sadbhav-hospital',
  title: 'Sadbhav Hospital',

  projectId: 'v0ztl8cn',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Health Updates')
              .child(
                S.list()
                  .title('Health Updates')
                  .items([
                    S.listItem()
                      .title('All Posts')
                      .child(S.documentTypeList('healthUpdate').title('All Posts')),
                    S.listItem()
                      .title('Featured Posts')
                      .child(
                        S.documentTypeList('healthUpdate')
                          .title('Featured Posts')
                          .filter('_type == "healthUpdate" && featured == true')
                          .initialValueTemplates([
                            S.initialValueTemplateItem('healthUpdate-featured'),
                          ]),
                      ),
                    S.listItem()
                      .title('Blog')
                      .child(
                        S.documentTypeList('healthUpdate')
                          .title('Blog')
                          .filter('_type == "healthUpdate" && coalesce(featured, false) == false && contentType != "reel"')
                          .initialValueTemplates([
                            S.initialValueTemplateItem('healthUpdate-blog'),
                          ]),
                      ),
                    S.listItem()
                      .title('Reels')
                      .child(
                        S.documentTypeList('healthUpdate')
                          .title('Reels')
                          .filter('_type == "healthUpdate" && contentType == "reel"')
                          .initialValueTemplates([
                            S.initialValueTemplateItem('healthUpdate-reel'),
                          ]),
                      ),
                  ]),
              ),
            S.listItem()
              .title('Patient Reviews')
              .child(
                S.documentTypeList('review').title('Patient Reviews'),
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'healthUpdate-featured',
        title: 'Featured Post',
        schemaType: 'healthUpdate',
        value: {featured: true},
      },
      {
        id: 'healthUpdate-blog',
        title: 'Blog Post',
        schemaType: 'healthUpdate',
        value: {featured: false},
      },
      {
        id: 'healthUpdate-reel',
        title: 'Reel / Short',
        schemaType: 'healthUpdate',
        value: {contentType: 'reel', featured: false},
      },
    ],
  },
})
