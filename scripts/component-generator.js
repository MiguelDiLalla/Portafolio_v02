module.exports = function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'Component name is required';
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['ui', 'page', 'component'],
        default: 'component',
      },
    ],
    actions: function (data) {
      const actions = [];
      const componentPath = data.type === 'ui' 
        ? 'src/components/ui/{{kebabCase name}}.tsx'
        : data.type === 'page'
        ? 'src/components/pages/{{pascalCase name}}Page.tsx'
        : 'src/components/{{pascalCase name}}.tsx';

      actions.push({
        type: 'add',
        path: componentPath,
        templateFile: 'scripts/templates/component.hbs',
      });

      return actions;
    },
  });
};
