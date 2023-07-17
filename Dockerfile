FROM node:current-slim

RUN npm install -g pnpm

CMD [ "/bin/sh" ]
