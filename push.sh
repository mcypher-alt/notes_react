#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}📂 Статус изменений:${NC}"
git status

echo -e "${GREEN}📦 Добавить все файлы? (y/n)${NC}"
read answer
if [ "$answer" != "y" ]; then
    echo -e "${RED}❌ Отменено${NC}"
    exit 0
fi

git add .

echo -e "${GREEN}📝 Введите сообщение коммита:${NC}"
read commit_message

git commit -m "$commit_message"

echo -e "${GREEN}🚀 Пушим в master? (y/n)${NC}"
read push_answer
if [ "$push_answer" != "y" ]; then
    echo -e "${RED}❌ Пуш отменён${NC}"
    exit 0
fi

git push origin master

echo -e "${GREEN}✅ Готово!${NC}"
