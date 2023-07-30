alias pnpm='docker compose run -v ${PWD}:${PWD} -w ${PWD} node pnpm'
alias pd='docker compose run -v ${PWD}:${PWD} -w ${PWD} -p 3000:5173 node pnpm dev --host 0.0.0.0'