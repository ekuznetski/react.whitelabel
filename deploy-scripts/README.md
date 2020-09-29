## DOCKER production environment

rename env to .env

### stage server settings:

run container with main app:
`sudo docker-compose run -p1002:1000 -p2002:2000 -p3002:3000 -p4002:4000 -p5002:5000 --no-deps --name hycm_c -d hycm`

run container with db:
`sudo docker-compose run --name db_c -d db`

update db `sudo docker exec db_stageC mongo hycm --eval "printjson(db.dropDatabase())" && sudo docker restart db_stageC && sudo docker exec db_stageC mongodump --archive=dump.gz --gzip --host 52.56.189.232 --port 27017 --username hycm_user --password XXXXX --authenticationDatabase admin --db hycm && sudo docker exec db_stageC mongorestore --gzip --archive=dump.gz && sudo docker exec db_stageC rm -rf dump.gz `

create folder structure before first deploy:
`mkdir -p -m 755 /var/www/stagec.hycm.com/logs/pm2/ /var/www/stagec.hycm.com/logs/nginx/ /var/www/stagec.hycm.com/client/assets/files/pdfs/ /var/www/stagec.hycm.com/client/web/ /var/www/stagec.hycm.com/client/admin/ /var/www/stagec.hycm.com/db/data/ /var/www/stagec.hycm.com/client/portal/ /var/www/stagec.hycm.com/server/ /var/www/stagec.hycm.com/db/backups/`

##### if user of host non dev, _logs/pm2, logs/nginx_ and _client/assests_ should have 777 permissions, for allow writing from docker


`cd /var/www/stagec.hycm.com && sudo rm -rf Dockerfile admin/ client/ docker-compose.yml db/ logs/ nginx/ pm2_services.json run_services.sh server/
 cd /var/www/stagea.hycm.com && sudo rm -rf Dockerfile admin/ client/ docker-compose.yml db/ logs/ nginx/ pm2_services.json run_services.sh server/`
 
 
 
 `sudo mkdir -p -m 755 /var/www/stagec.hycm.com/logs/pm2/ /var/www/stagec.hycm.com/logs/nginx/ /var/www/stagec.hycm.com/client/assets/files/pdfs/ /var/www/stagec.hycm.com/client/web/ /var/www/stagec.hycm.com/client/admin/ /var/www/stagec.hycm.com/db/data/ /var/www/stagec.hycm.com/client/portal/ /var/www/stagec.hycm.com/server/ /var/www/stagec.hycm.com/db/backups/ && sudo cp /var/www/stagea.hycm.com/.env /var/www/stagec.hycm.com/server`
 
 `sudo mkdir -p -m 755 /var/www/stagea.hycm.com/logs/pm2/ /var/www/stagea.hycm.com/logs/nginx/ /var/www/stagea.hycm.com/client/assets/files/pdfs/ /var/www/stagea.hycm.com/client/web/ /var/www/stagea.hycm.com/client/admin/ /var/www/stagea.hycm.com/db/data/ /var/www/stagea.hycm.com/client/portal/ /var/www/stagea.hycm.com/server/ /var/www/stagea.hycm.com/db/backups/ && sudo cp /var/www/stagea.hycm.com/.env /var/www/stagea.hycm.com/server`


ports stageC - 1000 2000 3000 4000 5000

ports stageB - 1001 2001 3001 4001 5001

ports stageC - 1002 2002 3002 4002 5002






sudo docker stop $(sudo docker ps -a -q) && sudo docker rm $(sudo docker ps -a -q)


cd /var/www/stagec.hycm.com && sudo rm -rf Dockerfile admin/ client/ docker-compose.yml db/ logs/ nginx/ pm2_services.json nginx.sh restart_nginx.sh server/



sudo mkdir -p -m 755 /var/www/stagec.hycm.com/logs/pm2/ /var/www/stagec.hycm.com/logs/nginx/ /var/www/stagec.hycm.com/client/assets/files/pdfs/ /var/www/stagec.hycm.com/client/web/ /var/www/stagec.hycm.com/client/admin/ /var/www/stagec.hycm.com/db/data/ /var/www/stagec.hycm.com/client/portal/ /var/www/stagec.hycm.com/server/ /var/www/stagec.hycm.com/db/backups/ && sudo cp /var/www/.env /var/www/stagec.hycm.com/server

sudo mkdir -p -m 755 /var/www/stagea.hycm.com/logs/pm2/ /var/www/stagea.hycm.com/logs/nginx/ /var/www/stagea.hycm.com/client/assets/files/pdfs/ /var/www/stagea.hycm.com/client/web/ /var/www/stagea.hycm.com/client/admin/ /var/www/stagea.hycm.com/db/data/ /var/www/stagea.hycm.com/client/portal/ /var/www/stagea.hycm.com/server/ /var/www/stagea.hycm.com/db/backups/ && sudo cp /var/www/.env /var/www/stagea.hycm.com/server


sudo mkdir -p -m 755 /var/www/stageb.hycm.com/logs/pm2/ /var/www/stageb.hycm.com/logs/nginx/ /var/www/stageb.hycm.com/client/assets/files/pdfs/ /var/www/stageb.hycm.com/client/web/ /var/www/stageb.hycm.com/client/admin/ /var/www/stageb.hycm.com/db/data/ /var/www/stageb.hycm.com/client/portal/ /var/www/stageb.hycm.com/server/ /var/www/stageb.hycm.com/db/backups/ && sudo cp /var/www/.env /var/www/stageb.hycm.com/server

sudo mkdir -p -m 755 /var/www/hycm.intl.mean/logs/pm2/ /var/www/hycm.intl.mean/logs/nginx/ /var/www/hycm.intl.mean/client/assets/files/pdfs/ /var/www/hycm.intl.mean/client/web/ /var/www/hycm.intl.mean/client/admin/ /var/www/hycm.intl.mean/db/data/ /var/www/hycm.intl.mean/client/portal/ /var/www/hycm.intl.mean/server/ /var/www/hycm.intl.mean/db/backups/ && sudo cp /var/www/.env /var/www/hycm.intl.mean/server

sudo mkdir -p -m 755 /var/www/qa.hycm.com/logs/pm2/ /var/www/qa.hycm.com/logs/nginx/ /var/www/qa.hycm.com/client/assets/files/pdfs/ /var/www/qa.hycm.com/client/web/ /var/www/qa.hycm.com/client/admin/ /var/www/qa.hycm.com/db/data/ /var/www/qa.hycm.com/client/portal/ /var/www/qa.hycm.com/server/ /var/www/qa.hycm.com/db/backups/ && sudo cp /var/www/.env /var/www/qa.hycm.com/server




[[ $(sudo docker ps -f "name=hycm_stageA" --format '{{.Names}}') == hycm_stageA ]] && sudo docker stop hycm_stageA && sudo docker rm hycm_stageA 

[[ $(sudo docker ps -f "name=db_stageA" --format '{{.Names}}') == db_stageA ]] && sudo docker stop db_stageA && sudo docker rm db_stageA 


sudo docker-compose down && sudo docker-compose build --no-cache && sudo docker-compose run --name db_a -d db && sudo docker-compose run -p1000:1000 -p2000:2000 -p3000:3000 -p4000:4000 -p5000:5000 --no-deps --name hycm_a -d hycm


sudo docker-compose down && sudo docker-compose build --no-cache && sudo docker-compose run --name db_b -d db && sudo docker-compose run -p1001:1000 -p2001:2000 -p3001:3000 -p4001:4000 -p5001:5000 --no-deps --name hycm_b -d hycm


sudo docker-compose down && sudo docker-compose build --no-cache && sudo docker-compose run --name db_c -d db && sudo docker-compose run -p1002:1000 -p2002:2000 -p3002:3000 -p4002:4000 -p5002:5000 --no-deps --name hycm_c -d hycm




find /var/www/stagec.hycm.com/db/backups/ -type f -mtime +7 -name '*.gz' -execdir rm -- '{}' \;


sudo rm -rf Dockerfile client/ db/ docker-compose.yml logs/ nginx/ pm2_services.json run_services.sh  server/ temp/


sudo docker exec -ti nginx tail -f /var/log/nginx/access.log /var/log/nginx/error.log



 docker-compose down &&  docker-compose build --no-cache &&  docker-compose run --name db -d db &&  docker-compose run -p1000:1000 -p2000:2000 -p3000:3000 -p4000:4000 -p5000:5000 --no-deps --name hycm -d hycm

