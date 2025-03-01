# Wasfat

# Mastering Full-Stack Development with ABP.io

---

## 00 - Introduction

### 00.01 - What You Will Learn in This Course

### 00.02 - What You Need to Know

---

## 01 - Setting Up the Development Environment

### 01.01 - Introduction

### 01.02 - Installing Node

- Node version: **20.18.0**

### 01.03 - Installing Visual Studio

- Community Edition: **version 2022**
- Make sure to configure it to run as administrator

### 01.04 - Installing Visual Studio Code

- Make sure to configure it to run as administrator

### 01.05 - Installing ABP.io CLI

```
dotnet tool install -g Volo.Abp.Cli --version 7.4.0
```

### 01.06 - Installing Angular CLI

```
npm install -g @angular/cli@16.2.16
```

### 01.07 - Installing the XAMPP Server

- Version: 8.0.30
- Make sure to configure it to run as administrator

### 01.08 - Summary: Setting Up the Development Environment

---

## 02 - Creating Our ABP Project

### 02.01 - Introduction

In this chapter, you will learn how to create your first ABP project using the ABP CLI. We will also cover setting up a GitHub repository to manage your project, cloning it locally, and configuring the project for development.

### 02.02 - Creating Our GitHub Repository

To manage your project’s code, we will create a GitHub repository. Follow these steps:

1. Go to [GitHub](https://github.com) and log in.
2. Click on **New** to create a new repository.
3. Give your repository a name, such as **Wasfat**, choose the visibility (public/private), and add a ReadMe file.
4. Click **Create Repository**.

### 02.03 - Cloning Our Repository to Local Machine

Once the repository is created, clone it to your local machine:

```bash
git clone https://github.com/your-username/Wasfat.git
cd Wasfat
```

### 02.04 - Creating Our Wasfat ABP Project

Now, we will create the ABP project inside the repository:

```
abp new Wasfat -u angular -dbms MySQL -m none --theme basic --pwa  -csf --version 7.4.5
```

#### Explanation of the command:

- `Wasfat`: This is the name of your project.
- `-u angular`: Specifies Angular as the UI framework.
- `-dbms MySQL`: Configures MySQL as the database management system.
- `-m none`: Creates the project without mobile modules (basic setup).
- `--theme basic`: Adds a basic theme to the UI.
- `--pwa`: Enables Progressive Web App (PWA) support.
- `-csf`: Creates a subfolder to contain all ABP-related files.
- `--version 7.4.5`: Specifies the ABP framework version to use for this project (7.4.5).

### 02.05 - Summary

In this chapter, we successfully set up our GitHub repository, cloned it, and created our first ABP project. You are now ready to start building your full-stack application using ABP.io!

---

## 03 - Running Our Wasfat ABP Project

### 03.01 - Introduction

In this chapter, we will walk through the steps necessary to run the Wasfat ABP project. This includes starting the Database Server, creating the Database and the Database User, updating the database, starting the backend API, installing the frontend dependencies, generating API proxies, and serving the Angular app. By the end of this chapter, your project should be fully functional on both the backend and frontend.

### 03.02 - Starting the Database Server

Before creating the database, make sure your database server (e.g., MySQL) is up and running. This video will show you how to start the MySQL server on your local machine or remote server.

### 03.03 - Creating the Database and the Database User

In this video, we will walk through how to create a new MySQL database and user. This will ensure that ABP can connect and manage the database schema.

### 03.04 - Configuring ABP to Use Our Database

After creating the database and user, we'll configure ABP to connect to this database by updating the `appsettings.json` file.

```
"ConnectionStrings": {
  "Default": "Server=localhost;Port=3306;Database=dataBase-name;Uid=dataBase-user-name;Pwd=SecretPassword;"
},
```

### 03.05 - Updating the Database with the Initial Migration

Before running the project, you need to ensure that the database is up to date by applying the initial migration.

### 03.06 - Running the HttpApi.Host

Next, start the backend API by running the `HttpApi.Host` project. This will ensure that the API is available to communicate with the frontend.

### 03.07 - Installing Frontend Dependencies

Now, navigate to the Angular frontend folder and install the necessary npm packages.

```ps
npm install
```

### 03.08 - Serving the Angular App

Once everything is set up, serve the Angular app to run it locally in the browser.

```bash
ng serve -o
```

#### Explanation of the command:

- `ng serve`: Starts a development server for the Angular app.
- `-o`: Opens the app automatically in the default browser.

### 03.09 - Troubleshooting an ng serve Problem

We used ChatGPT to troubleshoot an Angular serving problem and got this command:

```ps
npm install bootstrap-icons
```

### 03.10 - Summary

In this chapter, we successfully started the database server, created the database and user, configured ABP to connect to the database, updated the database schema, ran the backend API, installed frontend dependencies, and served the Angular app. Your Wasfat project is now fully operational and ready for development and testing!

---

## 04 - Building Backend CRUD Endpoints for Recipes

### 04.01 - What We Will Build in This Chapter

In this chapter, we are going to create the parts of our app that let us add, view, change, and remove recipes from the database. This is known as **CRUD**, which stands for Create, Read, Update, and Delete. We'll start by setting up the recipe structure and then make it possible to save and manage recipes in the database.

### 04.02 - Terminology

In order to understand this chapter, it's important to familiarize ourselves with some key terminology that we will encounter.

- **`Entity`**: A class that represents a data model in the application. It corresponds to a table in the database and typically has properties that map to columns in that table. For example, a `Recipe` entity might have properties like `Name` and `Description`, which would be represented as columns in a `Recipes` table in the database.
- **`EntityDTO (Data Transfer Object)`**: An object used to transfer data between different layers of an application, such as from the backend to the frontend, without exposing the entire entity.
- **`Mapping`**: The process of converting data from one format to another, such as from an entity to a DTO or vice versa.
- **`Migration`**: A way to version control changes to the database schema, such as creating or altering tables and columns.
- **`API`**: An acronym for Application Programming Interface, which provides a set of functions and protocols to allow applications to
- **`Swagger`**: An open-source tool used for documenting and testing RESTful APIs, providing a user interface to interact with the endpoints.

### 04.03 - Creating the Entity Class

To start, we will define our entity class, which represents the data structure we want to manage in our application. The entity will include basic properties such as `Name` and `Description`.

Location:  
`src`\\`Wasfat.Domain`\\`Recipes`\\`Recipe.cs`:

```csharp
public class Recipe : Entity<int>
{
    public string Name { get; set; }
    public string Description { get; set; }
}
```

### 04.04 - Adding the Recipe Entity to the DbContext

Next, we need to update our `WasfatDbContext` class to include the new entity. This will allow ABP to manage the entity in the database.

Location:  
`src`\\`Wasfat.EntityFrameworkCore`\\`EntityFrameworkCore`\\`WasfatDbContext.cs`:

```csharp
public DbSet<Recipe> Recipes { get; set; }
```

### 04.05 - Mapping the Recipe Entity to a Database Table

Then, configure the entity within the `OnModelCreating` method:

Location:  
`src`\\`Wasfat.EntityFrameworkCore`\\`EntityFrameworkCore`\\`WasfatDbContext.cs`:

```csharp
builder.Entity<Recipe>(b =>
{
    b.ToTable(WasfatConsts.DbTablePrefix + "Recipes",
        WasfatConsts.DbSchema);
    b.ConfigureByConvention();
});
```

### 04.06 - Adding a Migration

After updating the `DbContext`, we need to create a new migration to apply the changes to the database. This step will generate the necessary scripts to update the database schema.

Open the **Package Manager Console** and set the **Default project** to `src`\\`Wasfat.EntityFrameworkCore`. Then, run the following command:

```bash
Add-Migration CreateRecipesTable
```

### 04.07 - Applying the Migration

Once the migration has been created, the next step is to update the database to apply the migration. This will modify the database schema based on the changes defined in the migration.

In the **Package Manager Console**, with the **Default project** still set to `src`\\`Wasfat.EntityFrameworkCore`, run the following command:

```bash
Update-Database
```

### 04.08 - Creating the Data Transfer Object (DTO)

DTOs are used to transfer data between the application layers. In this section, we will create DTOs for the entity to be used in service methods.

Location:  
`src`\\`Wasfat.Application.Contracts`\\`Recipes`\\`RecipeDto.cs`:

```csharp
public class RecipeDto : EntityDto<int>
{
    public string Name { get; set; }
    public string Description { get; set; }
}
```

### 04.09 - Setting Up the Mapper Profile

To map between the entity and its DTO, we need to create a `MapperProfile`. This profile will handle the conversion between the entity and its corresponding DTOs.

Location:  
`src`\\`Wasfat.Application`\\`Recipes`\\`RecipeMapperProfile.cs`:

```csharp
public class RecipeMapperProfile : Profile
{
    public RecipeMapperProfile()
    {
        CreateMap<Recipe, RecipeDto>().ReverseMap();
    }
}
```

### 04.10 - Defining the Service Interface

The service interface defines the contract for our service, specifying which operations are available. Here, we will implement the `ICrudAppService` interface to provide basic CRUD functionality.

Location:  
`src`\\`Wasfat.Application.Contracts`\\`Recipes`\\`IRecipeAppService.cs`:

```csharp
public interface IRecipeAppService : ICrudAppService<
         RecipeDto,
         int,
         PagedAndSortedResultRequestDto>
{
}
```

### 04.11 - Implementing the Service

The service class will implement the CRUD operations defined in the service interface. We will extend the `CrudAppService` base class, which provides default implementations for common CRUD operations.

Location:  
`src`\\`Wasfat.Application`\\`Recipes`\\`RecipeAdminAppService.cs`:

```csharp
public class RecipeAdminAppService : CrudAppService<Recipe, RecipeDto, int, PagedAndSortedResultRequestDto>, IRecipeAppService
{
    public RecipeAdminAppService(
        IRepository<Recipe, int> repository
        )
    : base(repository)
    {

    }
}
```

### 04.12 - Exploring the API with Swagger

Once the service is implemented, we can use Swagger to explore the generated API and interact with our newly created CRUD operations. This section will guide you through testing the API endpoints using the Swagger UI.

### 04.13 - Summary

In this chapter, we successfully created a new entity and implemented a complete CRUD functionality for it using ABP.io. We covered creating the entity class, updating the `DbContext`, creating and applying database migrations, setting up DTOs, implementing the service layer, and testing the API with Swagger. With these steps, you now have a foundational understanding of managing entities in a full-stack ABP application.

---

## 05 - Customizing The CRUD Operations

### 05.01 - What You Will Learn in This Chapter

In this chapter, we will explore how to override the default CRUD operations provided by ABP.io. We'll customize each operation, including the ability to create, read, update, and delete recipes, to suit specific requirements. We will also cover how to import sample data, modify table prefixes, and handle paging in list results.

### 05.02 - Terminology

Before diving into the code, let's review some important terms that will be useful throughout this chapter.

- **`Repository`**: A repository is an abstraction layer that provides a standardized interface for interacting with the database. Thinks about it as a middleman that handles the communication between the app and the database, making it easier to retrieve or save data without directly interacting with the database.

- **`Pagination`**: A way to show a small part of the data, like displaying a few recipes at a time on a page, while also knowing how many total recipes there are.

### 05.03 - Importing Sample Data

This is how sample data was exported during the video session.

**Exporting the Data**:

1. Go to **phpMyAdmin**.
2. Select the **database**.
3. Search for the **Recipes** table.
4. Click the **Export** tab at the top menu.
5. Click **Export** at the bottom of the page.

You can download the sample file from the GitHub repo at:  
`Wasfat`\\`Sample Data Files`\\`Chapter 05`\\`customPrefix_recipes.sql`:

**⚠️ Note :**

> customPrefix* is the prefix configured above in `public const string DbTablePrefix = "customPrefix*"; `

This is how to Import the Sample Data Provided in This Course:

**Importing the Data**:

1. Go to **phpMyAdmin**.
2. Select the **database**.
3. Click the **Import** tab at the top menu.
4. Choose the sample data file (`customPrefix_recipes.sql`).
5. Scroll to the bottom and click **Import**.

**⚠️ Note :**

> customPrefix* is the prefix configured above in `public const string DbTablePrefix = "customPrefix*"; `

### 05.04 - Renaming & Assigning the Injected Repository to a Private Field

1. **Declare a private readonly field** to store the injected repository:

```csharp
private readonly IRepository<Recipe, int> _recipesRepository;
```

2. Assign the injected repository to the private field:

```csharp
public RecipeAdminAppService(IRepository<Recipe, int> recipesRepository)
    : base(recipesRepository)
{
    _recipesRepository = recipesRepository;
}
```

#### Full Example:

```csharp
public class RecipeAdminAppService : CrudAppService<Recipe, RecipeDto, int, PagedAndSortedResultRequestDto>, IRecipeAppService
{
    private readonly IRepository<Recipe, int> _recipesRepository;

    public RecipeAdminAppService(IRepository<Recipe, int> recipesRepository)
        : base(recipesRepository)
    {
        this._recipesRepository = recipesRepository;
    }
}
```

### 05.05 - Overriding the Read Operation - Get Single Recipe

We will now override the `GetAsync` method to add custom logic when retrieving a single recipe.

```csharp
        public override async Task<RecipeDto> GetAsync(int id)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            // custome logic
            recipe.Name = recipe.Name.Trim();

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }
```

### 05.06 - Overriding the Create Operation

Next, we'll override the `CreateAsync` method to add custom logic before saving a new recipe.

```csharp
        public override async Task<RecipeDto> CreateAsync(RecipeDto input)
        {
            var recipe = ObjectMapper.Map<RecipeDto, Recipe>(input);

            // custom logic
            recipe.Name = recipe.Name.Trim();

            await _recipesRepository.InsertAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }
```

### 05.07 - Overriding the Update Operation

We'll override the `UpdateAsync` method to add custom logic when updating a recipe.

```csharp
        public override async Task<RecipeDto> UpdateAsync(int id, RecipeDto input)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            // Only the available values from the input DTO will be applied to the recipe entity.
            // IMPORTANT: Any values not present in the DTO will remain unchanged in the recipe.
            ObjectMapper.Map<RecipeDto, Recipe>(input, recipe);

            await _recipesRepository.UpdateAsync(recipe, autoSave: true);

            var recipeDto = ObjectMapper.Map<Recipe, RecipeDto>(recipe);

            return recipeDto;
        }
```

**⛔ Warning:**  
Avoid the following approach, as it assigns the input directly to `recipe` and can result in loss of the original recipe state:

> **Incorrect**: Assigning `input` to `recipe` directly  
> `recipe = ObjectMapper.Map<RecipeDto, Recipe>(input);`

### 05.08 - Overriding the Delete Operation

We'll override the `DeleteAsync` method to add any custom logic before deleting a recipe.

```csharp
        public override async Task DeleteAsync(int id)
        {
            var recipe = await _recipesRepository.GetAsync(id);

            // custom logic
            if(recipe.Name.Contains("Shawarma", StringComparison.OrdinalIgnoreCase))
            {
                throw new UserFriendlyException("you can not delete Shawarmas");
            }

            await _recipesRepository.DeleteAsync(id);
        }
```

### 05.09 - Overriding the Read Operation - Paged List

We'll override the `GetListAsync` method to retrieve a paginated list of recipes.

```csharp
        public override async Task<PagedResultDto<RecipeDto>> GetListAsync(PagedAndSortedResultRequestDto input)
        {
            var totalCount = await _recipesRepository.GetCountAsync();

            var recipes = await _recipesRepository.GetPagedListAsync(
                input.SkipCount,
                input.MaxResultCount,
                input.Sorting ?? nameof(Recipe.Name)
                );

            // custom logic goes here

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            var pagedResultDto = new PagedResultDto<RecipeDto>(totalCount, recipeDtos);

            return pagedResultDto;
        }
```

### 05.10 - Adding a Custom Method - Get Recent Recipes

Finally, we will add a new custom method, `GetRecentRecipesAsync`, to retrieve a few of the most recent recipes.

```csharp
        public async Task<List<RecipeDto>> GetRecentAsync(int count = 3)
        {
            var query = await _recipesRepository.GetQueryableAsync();

            var recentRecipes = query
                                .OrderByDescending( recipe => recipe.Id )
                                .Take(count)
                                .ToList();

            var recentRecipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recentRecipes);

            return recentRecipeDtos;
        }
```

It's a good idea to add this to the interface so that we avoid making changes after it's been published.

Location:  
`src`\\`Wasfat.Application.Contracts`\\`Recipes`\\`IRecipeAppService.cs`:

```csharp
Task<List<RecipeDto>> GetRecentAsync(int count = 3);
```

### 05.11 - Summary

In this chapter, we successfully customized each CRUD operation in ABP.io for managing recipes. We learned how to override the default CRUD operations to implement specific business logic. Additionally, we demonstrated how to extend the `CrudAppService` by adding a custom method (`GetRecentRecipesAsync`) to fetch the most recent recipes, showcasing how to go beyond the built-in CRUD operations. These steps give you full control over your application's behavior when interacting with the database, allowing for greater flexibility and tailored functionality within your project.

---

## 06 - Configuring CLI Versions for ABP, Node, & Angular

### 06.01 - What You Will Learn in This Chapter

In this chapter, you will learn how to verify and set the correct CLI versions for ABP, Node.js, and Angular. Ensuring that these tools are compatible with each other is essential for keeping your development environment running smoothly. You will also learn how to confirm that these versions are correctly installed and functioning, so you can confidently work on your project without any version-related issues. By the end of this chapter, you’ll be able to manage and document the versions of these tools to maintain a stable and efficient workflow.

### 06.02 - Terminology

Before proceeding, let's clarify some key terms:

- **`ABP Packages Versions`**: are the versions of the backend and frontend libraries provided by the ABP framework, such as `Volo.Abp.*`, used for implementing various features in your ABP.io application. It is best to ensure that these package versions are compatible with the ABP CLI, Angular CLI, Angular packages, Node.js, and NPM versions to ensure smooth development and deployment.

- **`ABP CLI Version`**: is the version of the Command Line Interface tool used to create, build, and manage ABP.io projects. It is best to ensure that this version is compatible not only with the ABP package versions but also with the Angular CLI, Angular packages, Node.js, and NPM versions to enable smooth development and deployment.

- **`Angular Packages Versions`**: are the versions of the libraries and modules that make up the Angular framework, such as `@angular/core` and `@angular/common`. It is best to ensure that these package versions are compatible with the Angular CLI, ABP packages, ABP CLI, Node.js, and NPM versions to ensure smooth development and deployment.

- **`Angular CLI Version`**: is the version of the command-line tool used to create, develop, and maintain Angular applications. It is best to ensure that the Angular CLI version is compatible with the Angular package versions, ABP CLI, Node.js, and NPM versions to avoid conflicts and ensure smooth development and deployment.

- **`NVM Version`**: is the version of the Node Version Manager (NVM), a tool that allows developers to install, switch, and manage multiple versions of Node.js on their system. It is not critical to install a specific version of NVM; it is best to install the latest version to ensure compatibility and smooth development and deployment across different environments.

- **`Node Version`**: is the version of the JavaScript **runtime** that executes JavaScript code on the server. It is best to ensure that the Node.js version is compatible with Angular CLI, Angular packages, ABP CLI, ABP packages, and NPM versions to ensure smooth development and deployment.

- **`NPM CLI Version`**: is the CLI version of the (Node Package Manager), bundled with Node.js, used to install, update, and manage JavaScript dependencies. Installing Node.js will automatically ensure the correct version of NPM is installed unless manually modified later.

### 06.03 - Checking Installed ABP Packages Versions

1. Open your project in Visual Studio.

2. Use the shortcut `Ctrl + Shift + t` to search for the `.csproj` file, for example:

   ```bash
   Application.csproj
   ```

3. You should find a path similar to:

   ```
   aspnet-core\src\Wasfat.Application\Wasfat.Application.csproj
   ```

4. Inside the `.csproj` file, locate the `PackageReference` tags to check the current ABP version:

   ```xml
   <ItemGroup>
     <PackageReference Include="Volo.Abp.Account.Application" Version="7.4.5" />
     <PackageReference Include="Volo.Abp.Identity.Application" Version="7.4.5" />
     <PackageReference Include="Volo.Abp.PermissionManagement.Application" Version="7.4.5" />
     <PackageReference Include="Volo.Abp.TenantManagement.Application" Version="7.4.5" />
     <PackageReference Include="Volo.Abp.FeatureManagement.Application" Version="7.4.5" />
     <PackageReference Include="Volo.Abp.SettingManagement.Application" Version="7.4.5" />
   </ItemGroup>
   ```

5. Note the version of ABP in your project, in this case,

   `7.4.5`

### 06.04 - Checking Installed Angular Packages Versions

1. In VSCode, press `Ctrl + P` and search for `package.json`.

2. Inside `package.json`, search for `@angular/core`:

   ```bash
   "@angular/core": "~16.2.0",
   ```

3. perform a google search for:

   ```
   angular cli releases
   ```

4. Visit the `npmjs.com` result: (at the time of the recording)

   ```
   https://www.npmjs.com/package/@angular/cli?activeTab=versions
   ```

5. Search for the latest release in the `~16.2.0` range, and take note of it, in our case:

   ```
   16.2.16
   ```

### 06.05 - Checking the Best Node Runtime to Install

1. Perform a Google search for:

   ```
   angular version compatibility
   ```

2. You should find a reference page as a result: (at the time of the recording)

   ```
   https://angular.dev/reference/releases
   ```

3. Look for the recommended Node.js versions for your Angular version:

   ```
   16.1.x || 16.2.x    ^16.14.0 || ^18.10.0
   ```

4. Next, search for the latest Node.js release within this range by googling:

   ```
   node releases
   ```

5. Choose the result from Nodejs.org and find the latest version in the `^18.10.0` range, for example:

   ```
   v18.20.4
   ```

### 06.06 - Documenting Versions in Angular's README

1. Press `Ctrl + P` in VSCode and search for `README.md`.

2. Add the following section to document the versions selected:

   ```bash
   ## Versions Used in This Project

   ABP: 7.4.5
   Node: 18.20.4
   Angular: 16.2.16
   ```

### 06.07 - Installing the Most Compatible ABP CLI Version

1. Verify the Installed Version

   ```bash
   abp -v
   ```

2. Uninstall the Current ABP CLI Version if needed

   Run the following command to uninstall the existing ABP CLI version:

   ```bash
   dotnet tool uninstall -g Volo.Abp.Cli
   ```

3. Install the Specific Version of ABP CLI

   To install the desired version (e.g., `7.4.5`), run:

   ```bash
   dotnet tool install -g Volo.Abp.Cli --version 7.4.5
   ```

4. Verify the Installed Version again

   After installation, verify the ABP CLI version:

   ```bash
   abp -v
   ```

   You should see something like this:

   `ABP CLI 7.4.5`

### 06.08 - Installing the Most Compatible Node Runtime Version

1. Perform a google search for:

   ```bash
   nvm for windows
   ```

2. Go to the GitHub release page:

   ```
   https://github.com/coreybutler/nvm-windows
   ```

3. Download and install the setup file (admin rights may be needed), for example:

   ```
   https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe
   ```

4. Verify that `nvm` is installed:

   ```bash
   nvm -v
   ```

   Output should look like this:

   `1.1.12`

5. Install the Selected Node Version

   In our case, run the following command to install Node.js v18.20.4:

   ```bash
   nvm install 18.20.4
   ```

6. Verify the Installation
   List all installed Node.js versions:

   ```bash
   nvm list
   ```

   Expected output:

   ```
       20.18.0
       18.20.4
       16.19.1
     * 14.21.3 (Currently using 64-bit executable)
   ```

7. Switch to the desired Node version

   ```bash
   nvm use 18.20.4
   ```

   Verify again:

   ```bash
   nvm list
   ```

   Output should show the active version:

   ```
       20.18.0
     * 18.20.4 (Currently using 64-bit executable)
       16.19.1
       14.21.3
   ```

### 06.09 - Installing the Most Compatible Angular CLI Version (Locally)

To install **Angular CLI v16.2.16** only for a specific project (e.g., your "custom" project) without affecting the global version (for the entire NVM being used), you can follow these steps:

1. Make Sure You're Using the Correct Node Version

   Make sure you're using the correct Node version before installing Angular CLI:

   ```bash
   nvm use 18.20.4
   ```

2. Navigate to Your Project Directory

   Navigate to your Angular project directory:

   ```bash
   cd C:\path\to\your\repos\Wasfat\Wasfat\angular
   ```

3. (GLOBALLY) Uninstall the global Angular CLI first

   Run the following command to (GLOBALLY) uninstall Angular CLI version (e.g., 16.2.16):

   ```bash
   npm uninstall -g @angular/cli
   ```

4. (LOCALLY) Install the Specific Angular CLI Version

   Run the following command to (LOCALLY) install the specific Angular CLI version (e.g., 16.2.16):

   ```bash
   npm install @angular/cli@16.2.16 --save-dev
   ```

   **⚠️ Note :**

   > We did not use the `-g` flag to ensure that Angular CLI is installed locally with the desired version specifically for this project. This avoids potential conflicts with globally installed versions and ensures that the correct version is always used within the project.

5. Use `npx` for Angular CLI Commands

   From now on you should run Angular CLI commands using `npx` prefix to ensure you're using the local version:

   ```bash
   npx ng serve
   ```

6. Verify the Installed Angular Version

   ```bash
   npx ng version
   ```

### 06.10 - Testing Node Runtime Compatibility

Testing Node Runtime Compatibility Our Project

Once you have ensured that all the CLI versions (ABP, Node.js, Angular) are set correctly, you should be able to install the required `node_modules` without any issues by running the following command:

```bash
npm install
```

This command installs all dependencies defined in your `package.json` file.

### 06.11 - Testing ABP CLI Compatibility

After verifying that the ABP CLI version is correctly installed, you can generate the Angular proxies by running the following command:

```bash
abp generate-proxy -t ng
```

This will generate the necessary Angular proxy services for communicating with the backend.

### 06.12 - Testing Angular CLI Compatibility

With the correct version of Angular CLI installed, you can now run Angular-specific commands, like serving the Angular project. To ensure everything is working properly, use:

```bash
npx ng serve
```

This will start the Angular development server and allow you to view your project in the browser. You can also use this to run other Angular commands such as generating components or services.

### 06.13 - The Optimal Process for Running ABP Projects

1. **Check ABP, Node, and Angular Versions**

   Open the `README.md` file and verify the ABP, Node, and Angular versions we documented earlier. Ensure that all versions are aligned with the specified requirements.

2. **Verify ABP CLI Version**

   Check if the ABP CLI version matches the documented version. If not, uninstall the current version and install the desired version:

   ```bash
   abp -v
   ```

   To uninstall the current ABP CLI version:

   ```bash
   dotnet tool uninstall -g Volo.Abp.Cli
   ```

   To install the correct ABP CLI version:

   ```bash
   dotnet tool install -g Volo.Abp.Cli --version 7.4.5
   ```

3. **Check Node Version**

   Ensure the selected Node.js runtime version matches the documented version. If not, switch to the correct Node.js version:

   ```bash
   nvm list
   ```

   ```bash
   nvm use 18.20.4
   ```

   If needed, install the required Node.js version:

   ```bash
   nvm install 18.20.4
   ```

4. **Install Project Dependencies**

   After switching to the correct Node.js version, install all the required project dependencies by running:

   ```bash
   npm install
   ```

5. **Verify Angular CLI Version**

   Check the local Angular CLI version:

   ```bash
   npx ng version
   ```

   If the Angular CLI version does not match the desired version, install the correct version locally:

   ```bash
   npm install @angular/cli@16.2.16 --save-dev
   ```

6. **Run the ABP Backend (HttpApi.Host) from within Visual Studio**

   Project name: Wasfat.HttpApi.Host

7. **Generate the Proxies**

   After running the backend we can go ahead and generate the proxies:

   ```bash
   abp generate-proxy -t ng
   ```

8. **Serve the Angular Application**

   After ensuring everything is in place, serve the Angular application:

   ```bash
   npx ng serve -o
   ```

   This command will start the development server and open the application in your default web browser.

   By following these steps, you can ensure that your Angular workflow is running smoothly and minimize any version-related issues.

### 06.14 - Summary

In this chapter, we successfully checked, set, and verified the correct versions for ABP CLI, Node.js, and Angular CLI. We walked through how to check the versions, install them, and document them for future use. Additionally, we verified that Node dependencies could be installed, the Angular proxy could be generated, and Angular CLI commands run smoothly. Managing these versions ensures that your development environment remains consistent and reliable, preventing potential compatibility issues throughout your project's lifecycle.

## 07 - Setting Up the Recipes Module

### 07.01 - What You Will Learn in This Chapter

In this chapter, you will learn how to create a new module in an Angular application, specifically for managing recipes. You will generate components within this module for listing and creating recipes, configure routing, add menus for easy navigation, and set up localization for a multilingual interface. By the end of this chapter, you’ll be able to set up a fully functioning module in your Angular project, complete with navigation and localization.

### 07.02 - Terminology

- **`Module`**: In Angular, a module is a cohesive block of code dedicated to a specific purpose, such as managing recipes. Modules help organize code by grouping related components, services, and other files.
- **`Component`**: A component is a fundamental UI building block in Angular. Each component consists of a TypeScript file, an HTML template, and a CSS file for styling. Components are reusable pieces that define how the UI should look and behave.

- **`Routing`**: Routing in Angular allows navigation between different views or components. Routes are configured in the routing module, making it easy to define which component loads based on the URL path.

- **`Menus`**: Menus provide navigation options within the application. Configuring menus allows users to easily access different sections of the app, like viewing or creating recipes.

- **`Localization`**: Localization allows the application to display text in different languages, enhancing usability for a multilingual audience. Localized text is typically defined in JSON files for each supported language.

### 07.03 - fresh.angular & admin.angular

To set up an administration portal distinct from the public-facing site, we will create a separate Angular application named `admin.angular`. This application will serve as the front end for managing domain and administration tasks, while another copy of the the original Angular application will be used for the public site later on, where customers can browse the website and interact with public-facing features.

By separating these applications, we can maintain a clear distinction between admin and customer functionalities, improving modularity and security in our project structure.

### 07.04 - Generating the Recipes Module

To create the `recipes` module with routing, use the following command:

```bash
npx ng generate module recipes --routing
```

This will generate the `recipes` folder structure with a module file (`recipes.module.ts`) and a routing module (`recipes-routing.module.ts`).

### 07.05 - Generating the Recipes List Component

Generate the `RecipesList` component inside the `recipes` module. This component will display a list of all available recipes:

```bash
npx ng generate component recipes/recipes-list
```

This command creates `recipes-list.component.ts`, `recipes-list.component.html`, and `recipes-list.component.css`.

### 07.06 - Generating the CRUD Recipe Component

Generate the `CrudRecipe` component to handle creating, reading, updating, and deleting recipes:

```bash
npx ng generate component recipes/crud-recipe
```

This command will add `crud-recipe.component.ts`, `crud-recipe.component.html`, and `crud-recipe.component.css`.

### 07.07 - Adding the Main Route to the Recipes Module

This is the basic TypeScript structure of the modules and components so far in our Angular application:

```typescript
app/
│
├── 📂 home/
│   ├── home.component.ts
│   └── home-routing.module.ts
│   └── home.module.ts
│
├── 📂 recipes/
│   ├── 📂 crud-recipe/
│   │   └── crud-recipe.component.ts
│   │
│   ├── 📂 recipes-list/
│   │   └── recipes-list.component.ts
│   │
│   ├── recipes.module.ts
│   └── recipes-routing.module.ts
│
├── app.component.ts
├── app.module.ts
└── app-routing.module.ts
```

In `app-routing.module.ts`, configure the main route for the `recipes` module.

```typescript
{
  path: 'recipes',
  loadChildren: () =>
    import('./recipes/recipes.module').then(m => m.RecipesModule)
},
```

### 07.08 - Routing Inside the Recipes Module

Define specific routes for the `RecipesList` and `CrudRecipe` components in `recipes-routing.module.ts`:

```typescript
const routes: Routes = [
  {
    path: '',
    component: RecipesListComponent
  },
  {
    path: 'list',
    component: RecipesListComponent
  },
  {
    path: 'crud',
    component: CrudRecipeComponent
  }
];
```

### 07.09 - Adding Menus for Our Routes

Configure menus in `route.provider.ts` to provide navigation options for the recipes module:

```typescript
{
  path: '',
  name: '::Menu:Recipes',
  iconClass: 'fas fa-home',
  order: 2,
  layout: eLayoutType.application,
},
{
  path: '/recipes/list',
  name: '::Menu:RecipesList',
  parentName: '::Menu:Recipes',
  iconClass: 'fas fa-bars',
  order: 1,
  layout: eLayoutType.application,
},
{
  path: '/recipes/crud',
  name: '::Menu:CrudRecipe',
  parentName: '::Menu:Recipes',
  iconClass: 'fas fa-edit',
  order: 2,
  layout: eLayoutType.application,
},
```

### 07.10 - A Quick Look at Localization

To support multiple languages, add localization entries in JSON files, like `en.json` for English and `it.json` for Italian.

**en.json**:

```json
{
  "Menu:Recipes": "Recipes",
  "Menu:RecipesList": "Recipes List",
  "Menu:CrudRecipes": "CRUD Recipe"
}
```

**it.json**:

```json
{
  "Menu:Recipes": "Ricette",
  "Menu:RecipesList": "Elenco Ricette",
  "Menu:CrudRecipes": "CRUD Ricetta"
}
```

### 07.11 - Summary

In this chapter, we created a new module for managing recipes, added components for listing and editing recipes, configured routing, and set up menu navigation. We also introduced localization to support multiple languages, enhancing the usability of the application for different users. By following these steps, you have laid the groundwork for a modular, navigable, and multilingual application.

---

## 08 - Building the Recipes List Component

### 08.01 - What You Will Learn in This Chapter  
In this chapter, you will learn how to fetch data from the backend and display it in a table using the **ngx-datatable** component. By the end of this chapter, you’ll have a working recipes list component that retrieves data and displays it in a tabular format.

### 08.02 - Terminology  
- **`NgOnInit`**: A lifecycle hook in Angular that is called once the component is initialized.  
- **`Dependency Injection`**: A design pattern used in Angular to provide services or objects to components.  
- **`Ngx-datatable`**: A powerful Angular library for building data tables.


### 08.03 - Creating the (Get All Recipes) Endpoint

Location:  
`src`\\`Wasfat.Application`\\`Recipes`\\`RecipeAdminAppService.cs`:

```csharp
        public async Task<List<RecipeDto>> GetAllRecipesAsync()
        {
            var recipes = await _recipesRepository.GetListAsync();

            var recipeDtos = ObjectMapper.Map<List<Recipe>, List<RecipeDto>>(recipes);

            return recipeDtos;
        }
```


### 08.04 - Adding the (Get All Recipes) Method to the Interface

Location:  
`src`\\`Wasfat.Application.Contracts`\\`Recipes`\\`IRecipeAppService.cs`:

```csharp
        Task<List<RecipeDto>> GetAllRecipesAsync();
```


### 08.05 - Generating Proxy in the Frontend

Location:
`PS `\\`Wasfat`\\`admin.angular`>

```bash
abp generate-proxy -t ng
```


### 08.06 - Declaring The  `Recipes` Variable

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`:

```typescript
  recipes: RecipeDto[] = [];
```

### 08.07 - Creating the Constructor Function

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`: > `RecipesListComponent`

```typescript
  constructor() {
    console.log('RecipesListComponent > constructor');
  }
```

Explanation: The constructor is used to initialize the component. For now, it's empty because we haven't added any dependencies.

### 08.08 - Implementing the `OnInit` Interface

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`:

```typescript
 implements OnInit
```

```typescript
ngOnInit(): void {
  console.log('RecipesListComponent > ngOnInit!');
}
```
**⚠️ Note :**
> The constructor initializes the class and injects dependencies, while `ngOnInit` is used for setup logic that depends on the component being fully initialized.

### 08.09 - Injecting the `RecipeAdminService`

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`: > `constructor` > `parameters`

long version
```typescript
  private recipeAdminSvc: RecipeAdminService;

  constructor(recipeAdminService: RecipeAdminService) {
    console.log('RecipesListComponent > constructor');
    this.recipeAdminSvc = recipeAdminService;
  }
```

short version
```typescript
  constructor(private recipeAdminSvc: RecipeAdminService) {
    console.log('RecipesListComponent > constructor');
  }
```

### 08.10 - Arrow Functions

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`:

Traditional Function

```typescript
   handleRecipes(receivedRecipes: RecipeDto[]): void {
       this.recipes = receivedRecipes;
       console.log('My Recipes:', this.recipes);
   } 
```

Arrow Function
```typescript
    const recipesHandler: (receivedRecipes: RecipeDto[]) => void
      =
      (receivedRecipes: RecipeDto[]): void => {
        this.recipes = receivedRecipes;
        console.log('My Recipes:', this.recipes);
      }
      ;
```

### 08.11 - RxJS: Observable, Subscription, Data Emission, and Observer

An Observable is like a stream of data that you can watch and react to.

**Clarifying Story**

A restaurant has an agreement with you to try their meals and provide feedback. Each week, they send you a meal = (recipe-bundle) = (a set of recipes e.g., Burger + Fries + Drink) to try. Once the meal arrives, you try and evaluate and provide feedback for each meal: either **"LIKE"** if it meets your standards or **"DISLIKE"** if it doesn’t. 

- **Observable** = The stream of weekly sent meals.
- **Subscription** = The agreement that enables you to receive these meals.
- **Data emitted** = A Meal.
- **Observer** = The process of trying and providing feedback.


### 08.12 - RecipeDto, RecipeDto[], & Observable<RecipeDto[]>

**Comparison Table**

| **Aspect**            | **`RecipeDto`**                      | **`RecipeDto[]`**                     | **`Observable<RecipeDto[]>`**         |
|-----------------------|---------------------------------------|---------------------------------------|---------------------------------------|
| **Definition**         | Represents a single recipe object    | Represents a group of `RecipeDto` objects stored sequentially | Represents a sequence that emits an array of `RecipeDto` objects, either once or multiple times asynchronously. |
| **Purpose**            | Holds data for a single recipe       | Holds multiple `RecipeDto` objects    | Streams arrays of `RecipeDto` objects over time, supporting reactive programming. |
| **Emit Type**          | Not applicable                       | Not applicable                        | Can emit a single array (e.g., API fetch) or multiple arrays (e.g., real-time updates). |
| **Synchronous/Asynchronous** | Synchronous                   | Synchronous                           | Asynchronous, emits data when available. |
| **When to Use?**       | When you need to work with a single recipe | When multiple `RecipeDto` objects need to be managed together | When recipe data needs to be fetched asynchronously or streamed over time. |


### 08.13 - Getting All Recipes to the Frontend

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`: > ``ngOnInit()``

```typescript
    const recipesObservable = this.recipeAdminSvc.getAllRecipes();

    const recipesHandlerObserver: (receivedRecipes: RecipeDto[]) => void
      =
      (receivedRecipes: RecipeDto[]): void => {
        this.recipes = receivedRecipes;
        console.log('My Recipes:', this.recipes);
      };

    recipesObservable.subscribe(recipesHandlerObserver);

    console.log('a log after subscribing');
```
### 08.14 - How Programmers Usually Use Proxy Observables

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`: > ``ngOnInit()``

```typescript
  
    this.recipeAdminSvc.getAllRecipes().subscribe(
      (receivedRecipes) => {
        this.recipes = receivedRecipes;
        console.log('My Recipes:', this.recipes);
      }
    );
  
```

### 08.15 - Importing `Theme Shared Module`

Location:  
`src`\\`app`\\`recipes`\\`recipes.module.ts`: > `@NgModule` > `imports`

```
ThemeSharedModule 
```

Ngx-Datatable Link

```
https://swimlane.github.io/ngx-datatable/
```

### 08.16 - Updating the HTML File

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.html`:

```html
<ngx-datatable [rows]="recipes" default>
  <ngx-datatable-column [name]="'ID'" prop="id"></ngx-datatable-column>
  <ngx-datatable-column [name]="'Name'" prop="name"></ngx-datatable-column>
  <ngx-datatable-column [name]="'Description'" prop="description"></ngx-datatable-column>
</ngx-datatable>
```

### 08.17 - Shortening the getAllRecipes Even More

Location:  
`src`\\`app`\\`recipes`\\`recipes-list`\\`recipes-list.component.ts`:

```html
    this.recipeAdminSvc.getAllRecipes().subscribe(data => this.recipes = data);
```


### 08.18 - Summary

In this chapter, you learned how to:
1. Create a backend endpoint to fetch all recipes.
2. Add the new method to the service interface.
3. Generate proxies for frontend usage.
4. Retrieve and display the data in the Angular component using **ngx-datatable**.

By the end of this chapter, you now have a functional recipes list component that fetches and displays data in a simple table. In future chapters, we’ll enhance this table with sorting, filtering, and pagination.

---

## 09 - Building the Create Recipe Component

### 09.01 - What You Will Learn in This Chapter  
In this chapter, you will learn how to create a new recipe using a **Reactive Form** in Angular. By the end of this chapter, you will have a working Create Recipes component that allows users to submit new recipes, validates the input, and sends the data to the backend.


### 09.02 - Terminology  

- **Reactive Forms** is a module in Angular that helps build forms that ensure automatic synchronization between the user interface (UI) layer (basically the HTML) and the logic layer (basically the TypeScript). Changes made by users in the UI are immediately synchronized behind the senses with the form data that exists in the TypeScript side, and vice versa. This dynamic synchronization makes state management very easy and robust. For example, if we have a cart form containing multiple items, and the user changes the quantity of an item in the cart, this UI change is automatically reflected in the form data on the TypeScript side. This updated data can then be easily used to trigger an update to the cart's subtotal in the TypeScript logic. In turn, the change in the subtotal on the data side is automatically synchronized with the UI, allowing the user to see an immediate update to the cart total.
- **FormControl**: Represents a single input field within a form.
- **FormGroup**: A collection of form controls that are managed as a single unit.
- **Validation**: A process that ensures the data provided by users adheres to predefined rules before submission.


### 09.03 - Verifying the Backend Create Recipe Endpoint


**Location**:  
`src`\\`Wasfat.Application`\\`Recipes`\\`RecipeAdminAppService.cs`

```csharp
public override async Task<RecipeDto> CreateAsync(RecipeDto input)
{
  // ...
}
```


### 09.04 - Verifying the Frontend Proxy for Create Recipe

If you do not see the methods in the proxy folder you will have to run this command 

**Location**:  
`PS `\\`Wasfat`\\`admin.angular`>

```bash
abp generate-proxy -t ng
```


### 09.05 - Importing ReactiveFormsModule via SharedModule

**Location**:  
`src`\\`app`\\`shared`\\`shared.module.ts`: `@NgModule` > `imports[]` & `Export[]`

```typescript
    ReactiveFormsModule
```

Do not forget to import the Shard module to the recipes module

**Location**:  
`src`\\`app`\\`recipes`\\`recipes.module.ts`: ``@NgModule`` > ``imports[]``

```typescript
    SharedModule
```

Also remove the ThemeSharedModule from the Recipes Module as it is already available in the Shared module 

**Location**:  
`src`\\`app`\\`recipes`\\`recipes.module.ts`: ``@NgModule`` > ``imports[]``

```typescript
    ThemeSharedModule // Remove this line 
```
   
### 09.06 - Declaring the `recipeFormGroup` 

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`

```typescript
recipeFormGroup: FormGroup;
```


### 09.07 Injecting Important Dependencies


1. Injecting the `RecipeAdminService`

    **Location**:  
    `src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: `constructor` > `parameters`

    ```typescript
    private recipeAdminSvc: RecipeAdminService
    ```

2. Injecting the `FormBuilder`  

    **Location**:  
    `src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: `constructor` > `parameters`

    ```typescript
    private fb: FormBuilder
    ```
3. Injecting The `Router`  

    **Location**:  
    `src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: `constructor` > `parameters`
    
    ```typescript
    private router: Router
    ```


Final Constructor with All Dependencies

```typescript
  constructor(
    private recipeAdminSvc: RecipeAdminService,
    private fb: FormBuilder,
    private router: Router) {

  }
```

### 09.08 - Implementing `OnInit`

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: ``class RecipesModule``

```typescript
implements OnInit
```

```typescript
  ngOnInit(): void {
    console.log('CrudRecipeComponent > ngOnInit');
  }
```


### 09.09 - Building the Form

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: `ngOnInit` > `method body`

```typescript
    this.recipeFormGroup = this.fb.group({
      name: [''],
      description: ['']
    });
```

### 09.10 - Canceling and Navigating to Recipes List

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`

```typescript
  cancel(): void {
    this.router.navigate(["/recipes/list"]);
  }
```


### 09.11 - Sending Form Values to the Backend

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`

```typescript
  createRecipe(): void {
    this.recipeAdminSvc.create(this.recipeFormGroup.value).subscribe((response) => {
      console.log('Recipe created successfully', response);
      this.router.navigate(["/recipes/list"]);
    });
  }
```

### 09.12 Adding Angular Material

Run the following command in the Power Shell (PS) terminal 

```Bash
ng add @angular/material@16.2.14
```

Check the changes in Angular.json
```Bash
"@angular/material": "^16.2.14",
```

### 09.13 Importing the Needed Material Modules

**Location**:  
`src`\\`app`\\`shared`\\`shared.module.ts`: `@NgModule` > `imports[]` & `Export[]`

```typescript
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
```

### 09.14 - HTML: Preparing a Bootstrap Card

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
<div class="card">
  <div class="card-header">
    this is the card header
  </div>
  <div class="card-body">
    this is the card body
  </div>
</div>

```

### 09.15 - HTML: Preparing the Grid

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
<div class="card">
  <div class="card-header">
    <div class="row">
      <div class="col-md-6 border">
        Left card header
      </div>
      <div class="col-md-6 border">
        right card header
      </div>
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-6 border">
        Left card body
      </div>
      <div class="col-md-6 border">
        right card body
      </div>
    </div>
  </div>
</div>
```

### 09.16 - HTML: Adding the Cancel Button

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
        <button type="button" class="me-2" mat-stroked-button color="warn" (click)="cancel()">
          Cancel
        </button>
```

### 09.17 - HTML: Adding the Create Button

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
        <button type="button" class="me-2" mat-stroked-button color="primary" (click)="createRecipe()">
          Create
        </button>
```

### 09.18 - HTML: Wrapping the `Card Body Row` within a Form Element

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
    <form action="">      
      <!-- here goes the: card-body-row  -->
    </form>
```

### 09.19 - HTML: Binding the Form Group

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

Remove the `form` action and bind the `formGroup` using the following syntax:

```html
[formGroup]="recipeFormGroup"
```

The updated form should look something like this:

```html
    <form [formGroup]="recipeFormGroup">
      <div class="row">
        <div class="col-md-6 border">
          <!-- left body -->
        </div>
        <div class="col-md-6 border">
          <!-- right body -->
        </div>
      </div>
    </form>
``` 

### 09.20 - HTML: Adding the ``Name`` Form Fields

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter recipe name">
          </mat-form-field>
```

**💡 Reference :**
> **Search for**: `angular material input`  
> **The Google result page at the time of the recording** : [Angular Material Input](https://material.angular.io/components/input/overview)


### 09.21 - HTML: Adding the Description `textarea` Form Field

**Location**:  
`src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`

```html
          <mat-form-field class="w-100" appearance="outline">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" placeholder="Enter recipe description"></textarea>
          </mat-form-field>
```

### 09.22 - Testing Our Form

At this stage, the form should be ready to use. You can test it by interacting with the form and even debug it in the backend by placing a breakpoint in the `CreateAsync` endpoint function.

### 09.23 - Refactoring `buildForm`

Use `Ctrl+DOT` in VS Code to quickly refactor the form initialization logic into a separate method.

Updated code:

```typescript
ngOnInit(): void {
  this.buildForm();
}

private buildForm(): void {
  this.recipeFormGroup = this.fb.group({
    name: [''],
    description: ['']
  });
}
```

### 09.24 - Adding Form Validation Rules

**Step 1: Add Validators for the `name` Field** 
   
  **Location**:  
  `src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.ts`: `buildForm`   
  ```typescript
  [Validators.required, Validators.minLength(3)]
  ```

  Update code
  ```typescript
  private buildForm() {
    this.recipeFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }
  ```


**Step 2: Prevent Recipe Creation if the Form is Invalid**  

  ```typescript
    if (this.recipeFormGroup.invalid) {
      alert("Some fields are not valid.");
      return;
    }
  ```

   Update Code  
   **Location**:  
   `src`\\`app`\\`recipes`\\`create-recipe`\\`create-recipe.component.html`   

  ```typescript
  createRecipe(): void {
    if (this.recipeFormGroup.invalid) {
      alert("Some fields are not valid.");
      return;
    }
    this.recipeAdminSvc.create(this.recipeFormGroup.value).subscribe((response) => {
      console.log('Recipe created successfully', response);
      this.router.navigate(["/recipes/list"])
    });
  }
  ```   

### 09.25 - Removing the Bordered Guides  

Press **Ctrl+H** to search for "border" and replace it with an empty string to remove the border around the columns in our Bootstrap grid.

### 09.26 - Summary  

In this chapter, we learned how to build a Create Recipes Component in Angular.  

  - We started by verifying the `CreateAsync` backend endpoint and ensuring the proxy methods were available in the Angular application by generating the proxy using the `abp generate-proxy` command.  
  - Next, we configured the shared module to include `ReactiveFormsModule` and Angular Material components, ensuring all necessary imports were in place.  
  - Using a `FormGroup` and `FormBuilder`, we initialized the recipe form, structured it, and added validation rules to enforce proper input.  
  - We designed a responsive UI with Bootstrap and Angular Material, including form fields for recipe name and description, wrapped in a visually appealing card layout.  
  - Finally, we implemented the `createRecipe` method to validate the form, submit the data to the backend, and navigate to the recipe list upon successful creation.  

This chapter provided a step-by-step guide to creating a polished recipe creation feature, setting the stage for editing existing recipes in the next chapter.

---

## 10 - Extending CRUD for Recipe Editing

### 10.01 What You Will Learn in This Chapter  
In this chapter, you will extend the recipe management functionality by enabling users to edit existing recipes. You will learn how to detect edit mode, load a recipe from the backend, patch form values, and implement a combined create/update method that dynamically handles both scenarios.

### 10.02 Terminology
- **Edit Recipe**: The state of the component when an existing recipe is being modified rather than created.  
- **Update Recipe**: The process of saving and persisting the modifications made during an edit session. This often involves validating the updated data and invoking a service method (or API call) to store the changes in the backend.  
- **ActivatedRoute**: An Angular service that provides access to information about a route associated with a component loaded in an outlet.  
- **Patch Value**: A method used to update parts of a form with new values without affecting the entire form group.

### 10.03 Verifying the Backend Update Recipe Endpoint
Ensure that the backend endpoint for updating a recipe is correctly implemented.

**Location**:  
`src`/`Wasfat.Application`/`Recipes`/`RecipeAdminAppService.cs` >  `UpdateAsync`

```csharp
        public override async Task<RecipeDto> UpdateAsync(int id, RecipeDto input)
        {
          // ...
        }
```

### 10.04 Verifying the Frontend Proxy for Update Recipe  
If you do not see the update method in your Angular proxy, regenerate it using the following command.

**Location**:  
`PS`/`Wasfat`/`admin.angular`

```bash
abp generate-proxy -t ng
```

### 10.05 Configuring Routing for Editing a Specific Recipe  
Add a new route that accepts a recipe ID for editing.

**Location**:  
`src`/`app`/`recipes`/`recipes-routing.module.ts`

```typescript
  {
    path: 'crud/:id',
    component: CrudRecipeComponent
  }  
```

### 10.06 Declaring `recipeId` & `isEditMode`  
In the `CrudRecipeComponent`, declare properties to hold the recipe ID and to flag the component's mode (create or edit).

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts`

```typescript
  recipeId: number | null = null;
  isEditMode = false;
```

### 10.07 Injecting the ActivatedRoute Dependency  
Inject the `ActivatedRoute` service to access route parameters.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts`

```typescript
    private activatedRoute: ActivatedRoute
```

### 10.08 Detecting Edit Mode  
Subscribe to the route parameters in `ngOnInit()` to determine if the component should operate in edit mode.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts`

```typescript
    // Check if a recipe ID is provided in the activatedRoute
    this.activatedRoute.paramMap.subscribe(params => {

      const idParam = params.get('id');

      if (!idParam) {
        return;
      }

      this.recipeId = Number(idParam);

      this.isEditMode = true;

      // load recipe from backend       

    });
```

### 10.09 Loading the Recipe from the Backend
Implement a method to fetch the recipe details using the recipe ID.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts`

```typescript      
      this.recipeAdminSvc.get(this.recipeId).subscribe(response => {
        // Populate the form with the retrieved recipe data

      });
```

### 10.10 Patching Form Values  
Use the `patchValue` method to update specific form fields with the recipe data.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts` > `loadRecipe` > `inside .subscribe` 

```typescript
      this.recipeFormGroup.patchValue({
        name: response.name,
        description: response.description
      });
```

### 10.11 Dynamically Labeling the Create/Save Button  
Change the button label based on the mode to reflect either creating or updating a recipe.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.html`

```html
        <button type="button" mat-stroked-button color="primary" (click)="saveRecipe()">
          {{ isEditMode ? 'Save' : 'Create' }}
        </button>
```

### 10.12 Implementing the `saveRecipe()` Function  
Implement a function that handles both creating and updating a recipe based on the `isEditMode` flag.

**Location**:  
`src`/`app`/`recipes`/`crud-recipe`/`crud-recipe.component.ts`

```typescript
  saveRecipe(): void {

    if (this.recipeFormGroup.invalid) {
      alert("some Fields are not valid.")
      return;
    }

    if (this.isEditMode && this.recipeId) {
      // update
      this.recipeAdminSvc.update(this.recipeId, this.recipeFormGroup.value).subscribe((response) => {
        console.log('Recipe updated successfully', response);
        this.router.navigate(["/recipes/list"]);
      });
    } else {
      // create
      this.recipeAdminSvc.create(this.recipeFormGroup.value).subscribe((response) => {
        console.log('Recipe created successfully', response);
        this.router.navigate(["/recipes/list"]);
      });
    }

  }
```

### 10.13 Testing the Update Recipe Functionality  
Test the functionality by navigating to a URL such as `/recipes/crud/39` to verify that:  
- The form loads with the existing recipe data.  
- Editing the fields and clicking the save button triggers the update process.

### 10.14 Troubleshooting Internal Request Errors

To check backend error logs:

1. In **Solution Explorer**, right-click on the `Wasfat.HttpApi.Host` project.
2. Navigate to the **log** folder.
3. Open the latest log file using Notepad++ to review any error messages.

**Fix:**  
Ensure that the following line is included in the `UpdateAsync` method to correctly set the DTO's Id:

**Location:**  
`src`/`Wasfat.Application`/`Recipes`/`RecipeAdminAppService.cs` > *UpdateAsync method*

```csharp
            input.Id = recipe.Id;
```

### 10.15 Wrapping Recipes List Within a Bootstrap Card  
Enhance the UI of the recipes list by wrapping it in a Bootstrap card.

**Location**:  
`src`/`app`/`recipes`/`recipes-list`/`recipes-list.component.html`

```html
<div class="card">
  <div class="card-header">
    <div class="row">
      <div class="col-md-6 border">
        Left card header
      </div>
      <div class="col-md-6 border">
        right card header
      </div>
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <!-- ngx-datatable goes here  -->
    </div>
  </div>
</div>
```

### 10.16 Adding the New Recipe Button  
Add a "New Recipe" button that navigates to the create recipe form. Update both the component and the HTML.

**Component Location**:  
`src`/`app`/`recipes`/`recipes-list`/`recipes-list.component.ts`

```typescript
  newRecipe(): void {
    this.router.navigate(["/recipes/crud"]);
  }
```

**HTML Location**:  
`src`/`app`/`recipes`/`recipes-list`/`recipes-list.component.html`

```html
            <div class="col-md-6 border text-end">
                <button type="button" mat-stroked-button color="primary" (click)="newRecipe()">
                    New Recipe
                </button>
            </div>
```

### 10.17 Adding the Edit Recipe Buttons  
Ensure that each recipe row has an edit button that navigates to the editing route with the recipe ID. Update both the component and the HTML.

**Component Location**:  
`src`/`app`/`recipes`/`recipes-list`/`recipes-list.component.ts`

```typescript
  editRecipe(id: number): void {
    this.router.navigate(["/recipes/crud", id]);
  }
```

**HTML Location**:  
`src`/`app`/`recipes`/`recipes-list`/`recipes-list.component.html`

```html
                <ngx-datatable-column [name]="'Edit'">
                    <ng-template let-row="row" ngx-datatable-cell-template>

                    </ng-template>
                </ngx-datatable-column>
```

```html
                        <button mat-stroked-button color="primary" (click)="editRecipe(row.id)">
                            Edit
                        </button>
```
### 10.18 Simplifying Navigation Menus

In this lecture, we simplify the navigation structure. Instead of having sub-menus under "Recipes" (one for listing and one for create/edit), the parent menu now leads directly to the Recipes list, which contains buttons for creating and editing recipes.

**Location:**  
`src`/`app`/`route.provider.ts`


**⚠️ Note :**  
> The change here is the addition of `/list` to the parent route. This small update directs the Recipes menu to point directly to the recipes list.

**Before:**

```typescript
      {
        path: '/recipes',
        name: '::Menu:Recipes',
        iconClass: 'fas fa-home',
        order: 2,
        layout: eLayoutType.application,
      }
```

**After:**

```typescript
      {
        path: '/recipes/list',
        name: '::Menu:Recipes',
        iconClass: 'fas fa-home',
        order: 2,
        layout: eLayoutType.application,
      }
```


**🗑️ Deleted sub-menus:**  
(No need to copy these sections; this code should be deleted)

```typescript
      {
        path: '/recipes/list',
        name: '::Menu:RecipesList',
        parentName: '::Menu:Recipes',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/recipes/crud',
        name: '::Menu:CrudRecipe',
        parentName: '::Menu:Recipes',
        iconClass: 'fas fa-home',
        order: 2,
        layout: eLayoutType.application,
      },
```


### 10.19 Updating Recipe Routes for Better UX

In this lecture, we update the recipe routes to be more user-friendly. Instead of using the term "crud," which is more programmer-centric, we adopt intuitive route names that clearly describe the actions:

**Location:**  
`src`/`app`/`recipes`/`recipes-routing.module.ts`


**⚠️ Note :**  
> The change here is replacing `/crud` with `/create` for new recipes and `/crud/:id` with `/edit/:id` for editing existing recipes.

**Before:**

```typescript
      {
        path: 'crud',
        component: CrudRecipeComponent
      },
      {
        path: 'crud/:id',
        component: CrudRecipeComponent
      }
```

**After:**

```typescript
      {
        path: 'create',
        component: CrudRecipeComponent
      },
      {
        path: 'edit/:id',
        component: CrudRecipeComponent
      }
```
**⚠️ Note :**  
> Be sure to update all references in your application from `/recipes/crud` and `/recipes/crud/:id` to `/recipes/create` and `/recipes/edit/:id` respectively. This includes any navigation links or redirects in your code.


### 10.20 Summary

In this chapter, we extended the CRUD functionality for recipe management by implementing editing capabilities. We accomplished the following:

- **Backend Update Verification:** Ensured the backend update endpoint correctly maps DTOs and updates recipes.
- **Routing Configuration:** Updated Angular routing to include dynamic recipe IDs.
- **Component Enhancements:** Declared `recipeId` and `isEditMode` properties and injected `ActivatedRoute` to detect edit mode.
- **Data Loading & Patching:** Loaded recipe data from the backend and patched form values.
- **Dynamic UI Elements:** Adjusted button labels and implemented a unified `saveRecipe()` function to handle both create and update operations.
- **User-Friendly Routes:** Updated the routes to use `create` and `edit/:id` for improved clarity.
- **UI Improvements:** Enhanced the recipes list with Bootstrap cards and added navigation buttons for creating and editing recipes.


This completes the extension of the CRUD functionality for recipe editing.


---

## 11 - Implementing One-to-Many Relationships

### 11.01 - What You Will Learn in This Chapter  
In this chapter, you will learn how to implement a one-to-many relationship in your application using Abp.io. Specifically, you will create an **Instruction** entity that is associated with a **Recipe** entity. You will also set up the necessary backend and frontend components—including entity creation, DTOs, migrations, service implementation, Angular module generation, routing, and UI enhancements—to manage this relationship effectively.

### 11.02 - Terminology  

- **One-to-Many Relationship:** A database relationship where a single record in one table (e.g., Recipe) can be associated with multiple records in another table (e.g., Instruction).  
- **Entity:** A class that represents a data model in the application and corresponds to a table in the database.  
- **DTO (Data Transfer Object):** An object used to transfer data between different layers of the application.  
- **DbContext:** A class that manages database connections and is used to query and save data.  
- **Migration:** A version-controlled change to the database schema.  
- **Service Interface:** An interface that defines the contract for a service, specifying which operations are available.

### 11.03 - Creating the Instruction Entity Class  
Add the **Instruction** entity class with its properties (excluding the using statements).

**Location:**  
`src`/`Wasfat.Domain`/`Instructions`/`Instruction.cs`

```csharp
// code or command goes here
```

### 11.04 - Adding the Instruction Entity to the DbContext  
Add a `DbSet` for the **Instruction** entity to your DbContext.

**Location:**  
`src`/`Wasfat.EntityFrameworkCore`/`EntityFrameworkCore`/`WasfatDbContext.cs`

```csharp
// code or command goes here
```

### 11.05 - Mapping the Instruction Entity to a Database Table  
Configure the **Instruction** entity within the `OnModelCreating` method to map it to the appropriate database table.

**Location:**  
`src`/`Wasfat.EntityFrameworkCore`/`EntityFrameworkCore`/`WasfatDbContext.cs`

```csharp
// code or command goes here
```

### 11.06 - Adding a Migration  
Create a new migration to apply the changes to the database. For example, run the following command in your terminal:

```bash
dotnet ef migrations add AddInstructionEntity
```

### 11.07 - Applying the Migration  
Update the database to apply the new migration with the following command:

```bash
dotnet ef database update
```

### 11.08 - Creating the Data Transfer Object (DTO)  
Create the DTO for the **Instruction** entity.

**Location:**  
`src`/`Wasfat.Application.Contracts`/`Instructions`/`InstructionDto.cs`

```csharp
// code or command goes here
```

### 11.09 - Setting Up the Mapper Profile  
Create a `MapperProfile` to map between the **Instruction** entity and its DTO.

**Location:**  
`src`/`Wasfat.Application`/`Instructions`/`InstructionMapperProfile.cs`

```csharp
// code or command goes here
```

### 11.10 - Defining the Service Interface  
Define the service interface for managing the **Instruction** entity.

**Location:**  
`src`/`Wasfat.Application.Contracts`/`Instructions`/`IInstructionAppService.cs`

```csharp
// code or command goes here
```

### 11.11 - Implementing the Service  
Implement the service by copying the implementation from `RecipeAdminAppService` and replacing instances of **Recipe** with **Instruction**.

**Location:**  
`src`/`Wasfat.Application`/`Instructions`/`InstructionAdminAppService.cs`

```csharp
// code or command goes here
```

### 11.12 - Importing Sample Data  
Use phpMyAdmin (or your preferred database tool) to import sample data for the **Instruction** entity.

```bash
// code or command goes here
```

### 11.13 - Generating the Instructions Module  
Generate the Angular **instructions** module along with routing. For example, run:

```bash
ng generate module instructions --routing
```

### 11.14 - Generating the Instructions List Component  
Generate the `InstructionsList` component within the **instructions** module:

```bash
ng generate component instructions/instructions-list
```

### 11.15 - Generating the CRUD Instruction Component  
Generate the `CrudInstruction` component to handle creating, reading, updating, and deleting instructions:

```bash
ng generate component instructions/crud-instruction
```

### 11.16 - Adding the Main Route to the Instructions Module  
Configure the main route for the **instructions** module in your Angular application to establish the basic structure for the modules and components.

```typescript
// code or command goes here
```

### 11.17 - Routing Inside the Instructions Module  
Define specific routes for the `InstructionsList` and `CrudInstruction` components in the routing file.

**Location:**  
`src`/`app`/`instructions`/`instructions-routing.module.ts`

```typescript
// code or command goes here
```

### 11.18 - Adding Menus for Our Routes  
Configure the menus in your route provider to include navigation options for the **instructions** module.

**Location:**  
`src`/`app`/`route.provider.ts`

```typescript
// code or command goes here
```

### 11.19 - Generating Proxy in the Frontend  
Generate the Angular proxy to include the updated methods by running:

```bash
abp generate-proxy -t ng
```

### 11.20 - Building the Instructions List Component  
Start by copying the implementation from the `RecipesList` component TypeScript file and replacing **Recipe** with **Instruction**.

**Location:**  
`src`/`app`/`instructions`/`instructions-list`/`instructions-list.component.ts`

```typescript
// code or command goes here
```

### 11.21 - Updating the HTML File for the Instructions List  
Copy and adjust the HTML file from the `RecipesList` component, replacing references to **Recipe** with **Instruction**.

**Location:**  
`src`/`app`/`instructions`/`instructions-list`/`instructions-list.component.html`

```html
<!-- code or command goes here -->
```

### 11.22 - Importing the Shared Module  
Import the `SharedModule` into the **InstructionsModule** to ensure shared components and modules are available.

**Location:**  
`src`/`app`/`instructions`/`instructions.module.ts`

```typescript
// code or command goes here
```

### 11.23 - Building the CRUD Instruction Component  
Copy the implementation from the `CrudRecipe` component TypeScript file and replace **Recipe** with **Instruction**.

**Location:**  
`src`/`app`/`instructions`/`crud-instruction`/`crud-instruction.component.ts`

```typescript
// code or command goes here
```

### 11.24 - Updating the HTML File for the CRUD Instruction Component  
Update the HTML file for the `CrudInstruction` component accordingly.

**Location:**  
`src`/`app`/`instructions`/`crud-instruction`/`crud-instruction.component.html`

```html
<!-- code or command goes here -->
```

### 11.25 - Enhancing CRUD Instruction: Opening as a Dialog  
Enhance the CRUD Instruction component so that it can open as a dialog for a better user experience.

```typescript
// code or command goes here
```

### 11.26 - Adding a Route to Open the Instruction List for a Selected Recipe  
Configure a route to display the instruction list for a selected recipe. For example, add the following route configuration:

**Location:**  
`src`/`app`/`instructions`/`instructions-routing.module.ts`

```typescript
{
  path: 'recipe/:id/instruction',
  component: InstructionsListComponent
}
```

### 11.27 - Implementing Navigation for Instruction-Specific Instructions  
Update your navigation to pass the necessary data when opening the dialog for a specific recipe’s instructions. Ensure the correct parameters are sent to the dialog component.

```typescript
// code or command goes here
```

### 11.28 - Cleaning Up UI: Removing Instructions List from Main Navigation  
Remove the standalone instructions list route from the main navigation if it is no longer required.

**Location:**  
`src`/`app`/`route.provider.ts`

```typescript
// code or command goes here
```

### 11.29 - Enhancing the UX: Setting Order for the Next Instruction  
Add a method to calculate and set the order for the next instruction. Update the service and the component accordingly.

- **Service Update Location:**  
  `src`/`Wasfat.Application`/`Instructions`/`InstructionAdminAppService.cs`

  ```csharp
  // code or command goes here
  ```

- **Component Update Location:**  
  `src`/`app`/`instructions`/`crud-instruction`/`crud-instruction.component.ts`

  ```typescript
  // code or command goes here
  ```

### 11.30 - Summary  
In this chapter, we successfully implemented a one-to-many relationship between **Recipe** and **Instruction**. We covered creating the **Instruction** entity, updating the DbContext, creating and applying database migrations, setting up DTOs, implementing the service layer, generating the Angular module and components, and enhancing the user experience with improved navigation and dynamic order setting for instructions. This comprehensive guide demonstrates how to manage one-to-many relationships in a full-stack ABP application.
