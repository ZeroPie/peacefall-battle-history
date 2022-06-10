# Peacefall Battle History


Create UI component
```
nx g @nrwl/react:component header --project=peacefall-ui
```

create a component inside app
```
nx g @nrwl/next:component Layout --project=peacefall --style=none
```

Create a react lib
```
nx g @nrwl/react:lib ui --directory=peacefall
```

List possible actions
```
yarn nx list @nrwl/react
```

config storybook for ui lib
```
yarn nx run peacefall-ui:storybook
```

run e2e tests in watch mode
```
nx run peacefall-ui-e2e:e2e --watch
```

Rename Project  (move)
```
nx g @nrwl/workspace:move --project oldNG newNG
```

Generate a utils library
```
nx g @nrwl/workspace:lib utils --directory=peacefall
```
