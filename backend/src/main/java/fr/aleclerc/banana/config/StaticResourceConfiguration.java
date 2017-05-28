package fr.aleclerc.banana.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {

//	 private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
//	 "classpath:/META-INF/resources/", "classpath:/resources/",
//	 "classpath:/static/", "classpath:/public/" };
	 
	 private static final String[] ROUTER = {
			 "/sprints", "/sprint/**",
			 "/stories", "/story/**", "/plush", "/graph" };

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		registry.addResourceHandler("swagger-ui.html")//
				.addResourceLocations("classpath:/META-INF/resources/");

		registry.addResourceHandler("/webjars/**")//
				.addResourceLocations("classpath:/META-INF/resources/webjars/");

		registry.addResourceHandler("/img/**")//
				.addResourceLocations("classpath:/img/");

		registry.addResourceHandler("/**")//
				.addResourceLocations("classpath:/static/");

		registry.addResourceHandler(ROUTER)//
				.addResourceLocations("classpath:/static/index.html");

	}


}