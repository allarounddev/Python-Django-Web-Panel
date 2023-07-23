import logging
from crontab import CronTab

# Get an instance of a logger
logger = logging.getLogger(__name__)

def my_cron_job():
    print('Hello World')
    logging.info("It's Working!")
