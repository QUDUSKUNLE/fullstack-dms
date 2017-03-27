const expect = require('chai').expect;
const Document = require('../../../server/models').Document;

const params = {
  title: 'Document 1',
  content: 'This is a new document',
  access: 'public'
};

const notNullAttrs = ['title', 'content'];

let document;

describe('Document model', () => {
  beforeEach(() => {
    document = Document.build(params);
    return Document.sequelize.sync({ force: true });
  });

  // clear DB after each test
  afterEach(() => Document.sequelize.sync({ force: true }));

  describe('Create Document', () => {
    it('creates a Document instance', () =>
     expect(document).to.exist);

    it('has both title and content', () => {
      expect(document.title).to.equal(params.title);
      expect(document.content).to.equal(params.content);
      expect(document.access).to.equal(params.access);
    });

    it('saves document with valid attributes', () =>
      document.save().then((newDoc) => {
        expect(newDoc.title).to.equal(document.title);
        expect(newDoc.content).to.equal(document.content);
        expect(newDoc.access).to.equal(document.access);
      }));
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          document[attr] = null;

          document.save()
            .then(newDoc => expect(newDoc).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true);
        });
      });
    });
  });
});
