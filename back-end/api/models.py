from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from  datetime import timedelta,datetime

class UserManager(BaseUserManager):
    def create_user(self, email, name, tc ,password=None,password2=None):
        
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            tc=tc,
            
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,tc, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            name=name,
            tc=tc,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='Email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    tc= models.BooleanField()
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name','tc']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=False)
    product_name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank = True,upload_to="images/")
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    rating = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    id = models.AutoField(primary_key=True,editable=False)

    DisplayFields=["product_name","brand","category","price","countInStock"]


class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=False)
    products=models.ManyToManyField(Product)
    order_id = models.CharField(max_length=200,blank=False)
    totalPrice = models.DecimalField(max_digits=12,decimal_places=2,null=True,blank=True)
    shipping_Address = models.CharField(max_length=200,blank=False)
    delivery = models.DateField(default=datetime.now()+timedelta(days=7))
    _id =  models.AutoField(primary_key=True,editable=False)
    DisplayFields=["product","order_id","totalPrice","delivery"]
    def product(self):
        return ",".join([str(p) for p in self.products.all()])
    
    
    
